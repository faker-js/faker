import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { multiple } from '../helpers/multiple';
import { paragraph } from './paragraph';

/**
 * Generates the given number of paragraphs.
 *
 * @param fakerCore The FakerCore to use.
 * @param paragraphCount The number of paragraphs to generate. Defaults to `3`.
 * @param paragraphCount.min The minimum number of paragraphs to generate.
 * @param paragraphCount.max The maximum number of paragraphs to generate.
 * @param separator The separator to use. Defaults to `'\n'`.
 *
 * @example
 * paragraphs(fakerCore)
 * // 'Beatae voluptatem dicta et assumenda fugit eaque quidem consequatur. Fuga unde provident. Id reprehenderit soluta facilis est laborum laborum. Illum aut non ut. Est nulla rem ipsa.
 * // Voluptatibus quo pariatur est. Temporibus deleniti occaecati pariatur nemo est molestias voluptas. Doloribus commodi et et exercitationem vel et. Omnis inventore cum aut amet.
 * // Sapiente deleniti et. Ducimus maiores eum. Rem dolorem itaque aliquam.'
 *
 * paragraphs(fakerCore, 5)
 * // 'Quia hic sunt ducimus expedita quo impedit soluta. Quam impedit et ipsum optio. Unde dolores nulla nobis vero et aspernatur officiis.
 * // Aliquam dolorem temporibus dolores voluptatem voluptatem qui nostrum quia. Sit hic facilis rerum eius. Beatae doloribus nesciunt iste ipsum.
 * // Natus nam eum nulla voluptas molestiae fuga libero nihil voluptatibus. Sed quam numquam eum ipsam temporibus eaque ut et. Enim quas debitis quasi quis. Vitae et vitae.
 * // Repellat voluptatem est laborum illo harum sed reprehenderit aut. Quo sit et. Exercitationem blanditiis totam velit ad dicta placeat.
 * // Rerum non eum incidunt amet quo. Eaque laborum ut. Recusandae illo ab distinctio veritatis. Cum quis architecto ad maxime a.'
 *
 * paragraphs(fakerCore, 2, '<br/>\n')
 * // 'Eos magnam aut qui accusamus. Sapiente quas culpa totam excepturi. Blanditiis totam distinctio occaecati dignissimos cumque atque qui officiis.<br/>
 * // Nihil quis vel consequatur. Blanditiis commodi deserunt sunt animi dolorum. A optio porro hic dolorum fugit aut et sint voluptas. Minima ad sed ipsa est non dolores.'
 *
 * paragraphs(fakerCore, { min: 1, max: 3 })
 * // 'Eum nam fugiat laudantium.
 * // Dignissimos tempore porro necessitatibus commodi nam.
 * // Veniam at commodi iste perferendis totam dolorum corporis ipsam.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function paragraphs(
  fakerCore: FakerCore,
  paragraphCount: NumberOrRange = 3,
  separator: string = '\n'
): string {
  return multiple(fakerCore, () => paragraph(fakerCore), {
    count: paragraphCount,
  }).join(separator);
}
