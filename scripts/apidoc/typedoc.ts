import type {
  CommentDisplayPart,
  CommentTag,
  DeclarationReflection,
  ProjectReflection,
  SignatureReflection,
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
} from './parameterDefaults';
import { mapByName } from './utils';

/**
 * Creates and configures a new typedoc application.
 */
export function newTypeDocApp(): Application {
  const app = new Application();

  app.options.addReader(new TSConfigReader());
  // If you want TypeDoc to load typedoc.json files
  //app.options.addReader(new TypeDoc.TypeDocReader());

  // Read parameter defaults
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, parameterDefaultReader);
  // Add to debug json output
  app.serializer.addSerializer(new DefaultParameterAwareSerializer());

  return app;
}

/**
 * Apply our patches to the generated typedoc data.
 *
 * This is moved to a separate method to allow printing/saving the original content before patching it.
 *
 * @param project The project to patch.
 */
export function patchProject(project: ProjectReflection): void {
  patchProjectParameterDefaults(project);
}

/**
 * Selects the modules from the project that needs to be documented.
 *
 * @param project The project to extract the modules from.
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
        faker[extractModuleFieldName(module)] != null || includeTestModules
    );
}

/**
 * Selects the methods from the module that needs to be documented.
 *
 * @param module The module to extract the methods from.
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
 * @returns The signature to document.
 */
export function selectApiSignature(
  method: DeclarationReflection
): SignatureReflection {
  const signatures = method.signatures;
  if (signatures == null || signatures.length === 0) {
    throw new Error(`Method ${method.name} has no signature.`);
  }

  return signatures[signatures.length - 1];
}

/**
 * Selects the method signatures from the module that needs to be documented.
 * Method-Name -> Method-Signature
 *
 * @param method The module to extract the method signatures from.
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
  return moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1);
}

/**
 * Extracts the text (md) from a jsdoc tag.
 *
 * @param tag The tag to extract the text from.
 * @param signature The signature to extract the text from.
 */
export function extractTagContent(
  tag: `@${string}`,
  signature?: SignatureReflection,
  tagProcessor: (tag: CommentTag) => string[] = joinTagContent
): string[] {
  return signature?.comment?.getTags(tag).flatMap(tagProcessor) ?? [];
}

/**
 * Extracts the examples from the jsdocs without the surrounding md code block.
 *
 * @param signature The signature to extract the examples from.
 */
export function extractRawExamples(signature?: SignatureReflection): string[] {
  return extractTagContent('@example', signature).map((tag) =>
    tag.replace(/^```ts\n/, '').replace(/\n```$/, '')
  );
}

/**
 * Extracts all the `@see` references from the jsdocs separately.
 *
 * @param signature The signature to extract the see also references from.
 */
export function extractSeeAlsos(signature?: SignatureReflection): string[] {
  return extractTagContent('@see', signature, (tag) =>
    // If the @see tag contains code in backticks, the content is split into multiple parts.
    // So we join together, split on newlines and filter out empty tags.
    joinTagParts(tag.content)
      .split('\n')
      .map((link) => {
        link = link.trim();
        if (link.startsWith('-')) {
          link = link.slice(1).trim();
        }

        return link;
      })
      .filter((link) => link)
  );
}

/**
 * Joins the parts of the given jsdocs tag.
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
 * Checks if the given signature is deprecated.
 *
 * @param signature The signature to check.
 *
 * @returns `true` if it is deprecated, otherwise `false`.
 */
export function isDeprecated(signature: SignatureReflection): boolean {
  return extractTagContent('@deprecated', signature).length > 0;
}

/**
 * Extracts the "since" tag from the provided signature.
 *
 * @param signature The signature to check.
 *
 * @returns the contents of the @since tag
 */
export function extractSince(signature: SignatureReflection): string {
  return extractTagContent('@since', signature).join().trim();
}
