declare module 'react-autosuggest' {
    export interface AutosuggestProps<T> {
        suggestions: T[];
        onSuggestionsFetchRequested: (value: { value: string }) => void;
        onSuggestionsClearRequested?: () => void;
        getSuggestionValue: (suggestion: T) => string;
        renderSuggestion: (suggestion: T, { isHighlighted }: { isHighlighted: boolean }) => React.ReactNode;
        inputProps: {
            placeholder: string;
            value: string;
            className?: string;
            onChange: (event: React.FormEvent<HTMLInputElement>, { newValue }: Autosuggest.ChangeEvent) => void;
        };
        theme?: {
            container?: string;
            containerOpen?: string;
            input?: string;
            suggestionsContainer?: string;
            suggestionsContainerOpen?: string;
            suggestionsList?: string;
            suggestion?: string;
            suggestionFirst?: string;
            suggestionHighlighted?: string;
            sectionContainer?: string;
            sectionContainerFirst?: string;
            sectionTitle?: string;
        };
        alwaysRenderSuggestions?: boolean;
        focusInputOnSuggestionClick?: boolean;
        highlightFirstSuggestion?: boolean;
        id?: string;
        multiSection?: boolean;
        renderSectionTitle?: (section: any) => React.ReactNode;
        shouldRenderSuggestions?: (value: string) => boolean;
        theme?: any;
        renderInputComponent?: (inputProps: any) => React.ReactNode;
        renderSuggestionsContainer?: (params: any) => React.ReactNode;
        renderSectionContainer?: (params: any) => React.ReactNode;
        getSectionSuggestions?: (section: any) => any[];
        onSuggestionHighlighted?: (params: any) => void;
        alwaysRenderScrollLock?: boolean;
        focusInputOnSuggestionSelected?: boolean;
        onSuggestionSelected?: (event: any, data: any) => void;
        renderSuggestionContainer?: (params: any) => React.ReactNode;
        shouldRenderSection?: (section: any) => boolean;
        suggestionsContainerProps?: React.HTMLAttributes<HTMLDivElement>;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { className?: string };
        renderSuggestionsList?: (params: any) => React.ReactNode;
        getSuggestionId?: (suggestion: T) => string;
        shouldRenderSuggestions?: (value: string) => boolean;
        highlightOnlyResult?: boolean;
        isFocused?: boolean;
        alwaysRenderSuggestions?: boolean;
        theme?: AutosuggestTheme;
        id?: string;
        multiSection?: boolean;
        renderSectionTitle?: (section: any) => React.ReactNode;
        getSectionSuggestions?: (section: any) => T[];
        renderInputComponent?: (inputProps: AutosuggestRenderInputComponentParams) => React.ReactNode;
        renderSuggestionsContainer?: (params: AutosuggestRenderSuggestionsContainerParams) => React.ReactNode;
        renderSectionContainer?: (params: AutosuggestRenderSectionContainerParams) => React.ReactNode;
        onSuggestionHighlighted?: (params: AutosuggestSuggestionHighlightedParams) => void;
        alwaysRenderScrollLock?: boolean;
        focusInputOnSuggestionSelected?: boolean;
        onSuggestionSelected?: (event: React.FormEvent<any>, params: AutosuggestSuggestionSelectedParams<T>) => void;
        shouldRenderSection?: (section: T) => boolean;
        containerProps?: React.HTMLAttributes<HTMLDivElement>;
        suggestionsContainerProps?: React.HTMLAttributes<HTMLDivElement>;
        inputProps?: AutosuggestInputProps;
        className?: any;
        suggestionsContainerClassName?: any;
        suggestionClassName?: any;
        suggestionHighlightedClassName?: any;
    }

    export default function Autosuggest<T>(props: AutosuggestProps<T>): JSX.Element;

    namespace Autosuggest {
        export interface ChangeEvent {
            newValue: string;
            method: string;
        }
    }
}
