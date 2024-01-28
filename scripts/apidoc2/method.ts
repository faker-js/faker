import {
  SyntaxKind,
  type ConstructorDeclaration,
  type MethodDeclaration,
} from 'ts-morph';
import type { SignatureLikeDeclaration } from './signature';
import { processSignature } from './signature';
import { getSourceLink } from './source';
import type { ApiDocMethod } from './types';

type MethodLikeDeclaration = SignatureLikeDeclaration &
  Pick<MethodDeclaration, 'hasModifier'> & {
    getOverloads(): SignatureLikeDeclaration[];
  };

export function processMethods(methods: MethodDeclaration[]): ApiDocMethod[] {
  return processMethodLikes(methods, (v) => v.getName());
}

export function processConstructors(
  constructors: ConstructorDeclaration[]
): ApiDocMethod[] {
  return processMethodLikes(constructors, () => 'constructor');
}

function processMethodLikes<T extends MethodLikeDeclaration>(
  signatures: T[],
  nameResolver: (v: T) => string
): ApiDocMethod[] {
  const apiSignatures = signatures.filter(
    (m) => !m.hasModifier(SyntaxKind.PrivateKeyword)
  );
  return apiSignatures.map((v) => {
    const name = nameResolver(v);
    try {
      return processMethod(name, v);
    } catch (error) {
      throw new Error(
        `Error processing method ${name} at ${getSourceLink(v)}`,
        {
          cause: error,
        }
      );
    }
  });
}

function processMethod(
  name: string,
  method: MethodLikeDeclaration
): ApiDocMethod {
  const signatures = method.getOverloads();
  const apiSignatures: SignatureLikeDeclaration[] =
    signatures.length > 0 ? signatures : [method];

  const apiDocsSignatures = apiSignatures.map((v, i) => {
    try {
      return processSignature(v);
    } catch (error) {
      throw new Error(
        `Error processing signature ${name}/${i} at ${getSourceLink(v)}}`,
        { cause: error }
      );
    }
  });
  const sourceLink = getSourceLink(method);

  return {
    name,
    signatures: apiDocsSignatures,
    sourceLink,
  };
}
