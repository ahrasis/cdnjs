import { CSSAbbreviation } from '@emmetio/css-abbreviation';
import { Config, SnippetsMap } from '../config';
import { CSSSnippet } from './snippets';
import { CSSAbbreviationScope } from './scope';
declare type MatchInput = CSSSnippet | string;
/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 */
export default function parse(abbr: string | CSSAbbreviation, config: Config): CSSAbbreviation;
export { default as stringify } from './format';
export { CSSAbbreviationScope };
/**
 * Converts given raw snippets into internal snippets representation
 */
export declare function convertSnippets(snippets: SnippetsMap): CSSSnippet[];
/**
 * Finds best matching item from `items` array
 * @param abbr  Abbreviation to match
 * @param items List of items for match
 * @param minScore The minimum score the best matched item should have to be a valid match.
 */
export declare function findBestMatch<T extends MatchInput>(abbr: string, items: T[], minScore?: number, partialMatch?: boolean): T | null;
