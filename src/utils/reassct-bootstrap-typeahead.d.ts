declare module 'ss' {
    import * as React from 'react';

    export interface TypeaheadProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
        align?: 'justify' | 'left' | 'right';
        allowNew?: boolean | ((props: TypeaheadProps<T>, state: TypeaheadState<T>) => boolean);
        autoFocus?: boolean;
        bsSize?: 'large' | 'lg' | 'small' | 'sm';
        caseSensitive?: boolean;
        clearButton?: boolean;
        defaultInputValue?: string;
        defaultOpen?: boolean;
        defaultValue?: T[];
        disabled?: boolean;
        dropup?: boolean;
        emptyLabel?: React.ReactNode;
        filterBy?: ((option: T, text: string) => boolean) | string[];
        highlightOnlyResult?: boolean;
        id?: string;
        ignoreDiacritics?: boolean;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
        isInvalid?: boolean;
        labelKey: keyof T & string;
        maxHeight?: string;
        maxResults?: number;
        minLength?: number;
        multiple?: boolean;
        newSelectionPrefix?: string;
        onBlur?: React.FocusEventHandler<HTMLInputElement>;
        onChange?: (selected: T[]) => void;
        onFocus?: React.FocusEventHandler<HTMLInputElement>;
        onInputChange?: (text: string, event: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
        onMenuHide?: () => void;
        onMenuShow?: () => void;
        onPaginate?: (event: React.SyntheticEvent<HTMLElement>, numResults: number) => void;
        onSearch?: (query: string) => void;
        open?: boolean;
        paginate?: boolean;
        paginationText?: string;
        placeholder?: string;
        positionFixed?: boolean;
        renderMenuItemChildren?: (option: T, props: TypeaheadMenuProps<T>, idx: number) => React.ReactNode;
        renderToken?: (selectedItem: T, onRemove: (event: React.MouseEvent<HTMLElement>) => void) => React.ReactNode;
        selectHintOnEnter?: boolean;
        selected?: T[];
        shouldSelectHint?: (event: React.KeyboardEvent<HTMLInputElement>) => boolean;
        showMenu?: boolean;
        style?: React.CSSProperties;
        tabIndex?: number;
        useCache?: boolean;
        validate?: (option: T[], selectedOptions: T[]) => string;
    }
}
