import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';

export default forwardRef(function Dropdown(
    {
        options = [],
        className = '',
        placeholder = 'Choose an option',
        isFocused = false,
        value = '',
        onChange,
        disabled = false,
        loading = false,
        ...props
    },
    ref
) {
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);



    useImperativeHandle(ref, () => ({
        focus: () => buttonRef.current?.focus(),
    }));



    useEffect(() => {
        if (isFocused) {
            buttonRef.current?.focus();
        }
    }, [isFocused]);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isOpen) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    if (!disabled) setIsOpen(true);
                }
                return;
            }

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < options.length) {
                        handleSelect(options[focusedIndex]);
                        setFocusedIndex(focusedIndex);
                    }
                    break;
                case 'Escape':
                    event.preventDefault();
                    setIsOpen(false);

                    setFocusedIndex(selectedIndex);
                    
                    buttonRef.current?.focus();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, focusedIndex, options]);



    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && menuRef.current) {
            const focusedElement = menuRef.current.children[focusedIndex];
            if (focusedElement) {
                focusedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusedIndex, isOpen]);



    const toggleOpen = () => {
        if (!disabled) {
            setIsOpen((prev) => {
                const newIsOpen = !prev;
                setFocusedIndex(newIsOpen ? focusedIndex : -1);
                return newIsOpen;
            });
        }
    };



    const handleSelect = (option) => {
        setIsOpen(false);

        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);
        
        if (onChange) {
            onChange({
                target: {
                    value: option.id,
                    name: props.name,
                },
            });
        }
    };



    const selectedOption = options.find((opt) => String(opt.id) === String(value));
    const selectedIndex  = options.findIndex((opt) => String(opt.id) === String(value));

    return (
        <div className={'relative inline-block ' + className}>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleOpen}
                disabled={disabled || loading}
                className={
                    `flex items-center w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm text-left focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${loading ? 'justify-center cursor-wait' : 'justify-between'}`
                }
            >
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {selectedOption?.name || placeholder}
                        <svg
                            className="w-4 h-4 inline-block ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </>
                )}
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="absolute rounded border border-gray-200 bg-white shadow-lg z-50 max-h-60 overflow-y-auto"
                        style={{
                            top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + window.scrollY + 'px',
                            left: (buttonRef.current?.getBoundingClientRect().left || 0) + window.scrollX + 'px',
                            width: buttonRef.current?.offsetWidth + 'px',
                        }}
                    >
                        {options.map((option, index) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${index === focusedIndex ? 'bg-indigo-100' : ''}`}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>,
                    document.body
                )}
        </div>
    );
});
