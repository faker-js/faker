import type {
  Comment,
  CommentDisplayPart,
  CommentTag,
  DeclarationReflection,
  ProjectReflection,
  Reflection,
  SignatureReflection,
  TypeDocOptions,
} from 'typedoc';
import {
  Application,
  Converter,
  ReflectionKind,
  TSConfigReader,
} from 'typedoc';
import { faker } from '../../src';
import {
  DefaultParameterAwareSerializer,
  parameterDefaultReader,
  patchProjectParameterDefaults,
} from './parameter-defaults';
import { mapByName } from './utils';

type CommentHolder = Pick<Reflection, 'comment'>;

/**
 * Loads the project using TypeDoc.
 *
 * @param options The options to use for the project.
 *
 * @returns The TypeDoc application and the project reflection.
 */
export async function loadProject(
  options: Partial<TypeDocOptions> = {
    entryPoints: ['src/index.ts'],
    pretty: true,
    cleanOutputDir: true,
    tsconfig: 'tsconfig.build.json',
  }
): Promise<[Application, ProjectReflection]> {
  const app = await newTypeDocApp(options);

  const project = await app.convert();

  if (!project) {
    throw new Error('Failed to convert project');
  }

  patchProjectParameterDefaults(project);

  return [app, project];
}

/**
 * Creates and configures a new typedoc application.
 *
 * @param options The options to use for the project.
 */
async function newTypeDocApp(
  options?: Partial<TypeDocOptions>
): Promise<Application> {
  const app = await Application.bootstrapWithPlugins(options, [
    new TSConfigReader(),
  ]);

  // Read parameter defaults
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, parameterDefaultReader);
  // Add to debug json output
  app.serializer.addSerializer(new DefaultParameterAwareSerializer());

  return app;
}

/**
 * Selects the modules from the project that needs to be documented.
 *
 * @param project The project to extract the modules from.
 * @param includeTestModules Whether to include test modules.
 *
 * @returns The modules to document.
 */
export function selectApiModules(
  project: ProjectReflection,
  includeTestModules = false
): DeclarationReflection[] {
  return project
    .getChildrenByKind(ReflectionKind.Class)
    .filter(
      (module) =>
        faker[extractModuleFieldName(module) as keyof typeof faker] != null ||
        includeTestModules
    );
}

/**
 * Selects the methods from the module that needs to be documented.
 *
 * @param module The module to extract the methods from.
 *
 * @returns The methods to document.
 */
export function selectApiMethods(
  module: DeclarationReflection
): DeclarationReflection[] {
  return module
    .getChildrenByKind(ReflectionKind.Method)
    .filter((method) => !method.flags.isPrivate);
}

/**
 * Selects the signature from the method that needs to be documented.
 *
 * @param method The method to extract the signature from.
 *
 * @returns The signature to document.
 */
export function selectApiSignature(
  method: DeclarationReflection
): SignatureReflection {
  const signatures = method.signatures;
  if (signatures == null || signatures.length === 0) {
    throw new Error(`Method ${method.name} has no signature.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return signatures.at(-1)!;
}

/**
 * Selects the method signatures from the module that needs to be documented.
 * Method-Name -> Method-Signature
 *
 * @param module The module to extract the method signatures from.
 *
 * @returns The method signatures to document.
 */
export function selectApiMethodSignatures(
  module: DeclarationReflection
): Record<string, SignatureReflection> {
  return mapByName(selectApiMethods(module), selectApiSignature);
}

export function extractModuleName(module: DeclarationReflection): string {
  const { name } = module;
  // TODO @ST-DDT 2022-10-16: Remove in v10.
  // Typedoc prefers the name of the module that is exported first.
  if (name === 'AddressModule') {
    return 'Location';
  } else if (name === 'NameModule') {
    return 'Person';
  }

  return name.replace(/Module$/, '');
}

export function extractModuleFieldName(module: DeclarationReflection): string {
  const moduleName = extractModuleName(module);
  return moduleName[0].toLowerCase() + moduleName.substring(1);
}

export const MISSING_DESCRIPTION = 'Missing';

export function toBlock(comment?: Comment): string {
  return joinTagParts(comment?.summary) || MISSING_DESCRIPTION;
}

export function extractDescription(reflection: Reflection): string {
  return toBlock(reflection.comment);
}

/**
 * Extracts the source url from the jsdocs.
 *
 * @param reflection The reflection instance to extract the source url from.
 */
function extractSourceUrl(
  reflection: DeclarationReflection | SignatureReflection
): string {
  const source = reflection.sources?.[0];
  return source?.url ?? '';
}

/**
 * Extracts the source base url from the jsdocs.
 *
 * @param reflection The reflection instance to extract the source base url from.
 */
export function extractSourceBaseUrl(
  reflection: DeclarationReflection | SignatureReflection
): string {
  return extractSourceUrl(reflection).replace(
    /^(.*\/blob\/[0-9a-f]+\/)(.*)$/,
    '$1'
  );
}

/**
 * Extracts the relative source path from the jsdocs.
 *
 * @param reflection The reflection instance to extract the source path from.
 */
export function extractSourcePath(
  reflection: DeclarationReflection | SignatureReflection
): string {
  return extractSourceUrl(reflection).replace(
    /^(.*\/blob\/[0-9a-f]+\/)(.*)$/,
    '$2'
  );
}

/**
 * Extracts the text (md) from a jsdoc tag.
 *
 * @param tag The tag to extract the text from.
 * @param reflection The reflection to extract the text from.
 * @param tagProcessor The function used to extract the text from the tag.
 */
export function extractTagContent(
  tag: `@${string}`,
  reflection?: CommentHolder,
  tagProcessor: (tag: CommentTag) => string[] = joinTagContent
): string[] {
  const tags =
    reflection?.comment
      ?.getTags(tag)
      .flatMap(tagProcessor)
      .map((tag) => tag.trim()) ?? [];
  if (tags.some((tag) => tag.length === 0)) {
    throw new Error(`Expected non-empty ${tag} tag.`);
  }

  return tags;
}

/**
 * Extracts the text (md) from a single jsdoc tag.
 *
 * @param tag The tag to extract the text from.
 * @param reflection The reflection to extract the text from.
 * @param tagProcessor The function used to extract the text from the tag.
 *
 * @throws If there are multiple tags of that type.
 */
function extractSingleTagContent(
  tag: `@${string}`,
  reflection?: CommentHolder,
  tagProcessor: (tag: CommentTag) => string[] = joinTagContent
): string | undefined {
  const tags = extractTagContent(tag, reflection, tagProcessor);
  if (tags.length === 0) {
    return undefined;
  } else if (tags.length === 1) {
    return tags[0];
  }

  throw new Error(`Expected 1 ${tag} tag, but got ${tags.length}.`);
}

/**
 * Extracts the raw code from the jsdocs without the surrounding md code block.
 *
 * @param tag The tag to extract the code from.
 * @param reflection The reflection to extract the code from.
 */
function extractRawCode(
  tag: `@${string}`,
  reflection?: CommentHolder
): string[] {
  return extractTagContent(tag, reflection).map((tag) =>
    tag.replace(/^```ts\n/, '').replace(/\n```$/, '')
  );
}

/**
 * Extracts the default from the jsdocs without the surrounding md code block.
 *
 * @param reflection The reflection to extract the examples from.
 */
export function extractRawDefault(reflection?: CommentHolder): string {
  return extractRawCode('@default', reflection)[0] ?? '';
}

/**
 * Extracts and optionally removes the default from the comment summary.
 *
 * @param comment The comment to extract the default from.
 * @param eraseDefault Whether to erase the default text from the comment.
 *
 * @returns The extracted default value.
 */
export function extractSummaryDefault(
  comment?: Comment,
  eraseDefault = true
): string | undefined {
  if (!comment) {
    return;
  }

  const summary = comment.summary;
  const text = joinTagParts(summary).trim();
  if (!text) {
    return;
  }

  const result = /^(.*)[ \n]Defaults to `([^`]+)`\.(.*)$/s.exec(text);
  if (!result) {
    return;
  }

  if (result[3].trim()) {
    throw new Error(`Found description text after the default value:\n${text}`);
  }

  if (eraseDefault) {
    summary.splice(-2, 2);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastSummaryPart = summary.at(-1)!;
    lastSummaryPart.text = lastSummaryPart.text.replace(
      /[ \n]Defaults to $/,
      ''
    );
  }

  return result[2];
}

/**
 * Extracts the examples from the jsdocs without the surrounding md code block.
 *
 * @param reflection The reflection to extract the examples from.
 */
function extractRawExamples(reflection?: CommentHolder): string[] {
  return extractRawCode('@example', reflection);
}

/**
 * Extracts the examples from the jsdocs without the surrounding md code block, then joins them with newlines and trims.
 *
 * @param reflection The reflection to extract the examples from.
 */
export function extractJoinedRawExamples(
  reflection?: CommentHolder
): string | undefined {
  const examples = extractRawExamples(reflection);
  return examples.length === 0 ? undefined : examples.join('\n').trim();
}

/**
 * Extracts all the `@see` references from the jsdocs separately.
 *
 * @param reflection The reflection to extract the see also references from.
 */
export function extractSeeAlsos(reflection?: CommentHolder): string[] {
  return extractTagContent('@see', reflection, (tag) =>
    // If the @see tag contains code in backticks, the content is split into multiple parts.
    // So we join together, split on newlines and filter out empty tags.
    joinTagParts(tag.content)
      .split('\n')
      .map((link) => {
        link = link.trim();
        if (link.startsWith('-')) {
          link = link.slice(1).trimStart();
        }

        return link;
      })
      .filter((link) => link.length > 0)
  );
}

/**
 * Joins the parts of the given jsdocs tag.
 *
 * @param tag The tag to join the parts of.
 */
export function joinTagContent(tag: CommentTag): string[] {
  return [joinTagParts(tag?.content)];
}

export function joinTagParts(parts: CommentDisplayPart[]): string;
export function joinTagParts(parts?: CommentDisplayPart[]): string | undefined;
export function joinTagParts(parts?: CommentDisplayPart[]): string | undefined {
  return parts?.map((part) => part.text).join('');
}

/**
 * Checks if the given reflection is deprecated.
 *
 * @param reflection The reflection to check.
 *
 * @returns The message explaining the deprecation if deprecated, otherwise `undefined`.
 */
export function extractDeprecated(
  reflection?: CommentHolder
): string | undefined {
  return extractSingleTagContent('@deprecated', reflection);
}

/**
 * Extracts the "throws" tag from the provided signature.
 *
 * @param reflection The reflection to check.
 *
 * @returns The message explaining the conditions when this method throws. Or `undefined` if it does not throw.
 */
export function extractThrows(reflection?: CommentHolder): string | undefined {
  const content = extractTagContent('@throws', reflection).join('\n');
  return content.length === 0 ? undefined : content;
}

/**
 * Extracts the "since" tag from the provided signature.
 *
 * @param reflection The signature to check.
 *
 * @returns The contents of the `@since` tag.
 */
export function extractSince(reflection: CommentHolder): string {
  return extractSingleTagContent('@since', reflection) || MISSING_DESCRIPTION;
}
