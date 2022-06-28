import type {
  Context,
  DeclarationReflection,
  EventCallback,
  JSONOutput,
  ProjectReflection,
  SerializerComponent,
  SignatureReflection,
} from 'typedoc';
import { Reflection, ReflectionKind, TypeScript } from 'typedoc';

const reflectionKindFunctionOrMethod =
  ReflectionKind.Function | ReflectionKind.Method;

interface ParameterDefaultsAware extends Reflection {
  implementationDefaultParameters: Array<string | undefined>;
}

/**
 * TypeDoc EventCallback for EVENT_CREATE_DECLARATION events that reads the default parameters from the implementation.
 */
export const parameterDefaultReader: EventCallback = (
  context: Context,
  reflection: Reflection
): void => {
  const symbol = context.project.getSymbolFromReflection(reflection);
  if (!symbol) return;

  if (
    reflection.kindOf(reflectionKindFunctionOrMethod) &&
    symbol.declarations?.length
  ) {
    const lastDeclaration = symbol.declarations[symbol.declarations.length - 1];
    if (TypeScript.isFunctionLike(lastDeclaration)) {
      (reflection as ParameterDefaultsAware).implementationDefaultParameters =
        lastDeclaration.parameters.map((param) =>
          cleanParameterDefault(param.initializer?.getText())
        );
    }
  }
};

/**
 * Removes compile expressions that don't add any value for readers.
 *
 * @param value The default value to clean.
 * @returns The cleaned default value.
 */
function cleanParameterDefault(value: string): string;
function cleanParameterDefault(value?: string): string | undefined;
function cleanParameterDefault(value?: string): string | undefined {
  if (value == null) {
    return undefined;
  }
  // Strip type casts: "'foobar' as unknown as T" => "'foobar'"
  return value.replace(/ as unknown as [A-Za-z<>]+/, '');
}

/**
 * Serializer that adds the `implementationDefaultParameters` to the JSON output.
 */
export class DefaultParameterAwareSerializer
  implements SerializerComponent<Reflection>
{
  readonly priority = 0;

  supports(item: unknown): item is Reflection {
    return item instanceof Reflection;
  }

  toObject(
    item: Reflection,
    obj: Partial<JSONOutput.Reflection>
  ): Partial<JSONOutput.Reflection> {
    (obj as unknown as ParameterDefaultsAware).implementationDefaultParameters =
      (item as ParameterDefaultsAware).implementationDefaultParameters;
    return obj;
  }
}

/**
 * Replaces all methods' last signature's parameter's default value with the default value read from the implementation.
 *
 * @param project The project to patch.
 */
export function patchProjectParameterDefaults(
  project: ProjectReflection
): void {
  const functionOrMethods = project.getReflectionsByKind(
    reflectionKindFunctionOrMethod
  ) as DeclarationReflection[];
  for (const functionOrMethod of functionOrMethods) {
    patchMethodParameterDefaults(functionOrMethod);
  }
}

/**
 * Replaces the last signature's parameter's default value with the default value read from the implementation.
 *
 * @param method The method to patch.
 */
function patchMethodParameterDefaults(method: DeclarationReflection): void {
  const signatures = method.signatures;
  const signature = signatures?.[signatures.length - 1];
  const parameterDefaults = (method as unknown as ParameterDefaultsAware)
    .implementationDefaultParameters;
  if (signature && parameterDefaults) {
    patchSignatureParameterDefaults(signature, parameterDefaults);
  }
}

/**
 * Replaces the given signature's parameter's default value with the given default values.
 *
 * @param signature The signature to patch.
 * @param parameterDefaults The defaults to add.
 */
function patchSignatureParameterDefaults(
  signature: SignatureReflection,
  parameterDefaults: Array<string | undefined>
): void {
  const signatureParameters =
    signature.parameters ?? Array.from({ length: parameterDefaults.length });
  if (signatureParameters.length !== parameterDefaults.length) {
    throw new Error('Unexpected parameter length mismatch');
  }
  signatureParameters.forEach(
    (param, index) =>
      (param.defaultValue = parameterDefaults[index] || param.defaultValue)
  );
}
