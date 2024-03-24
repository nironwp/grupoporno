import React, { ChangeEvent, useState } from 'react';
import { FaSearch } from "react-icons/fa";

export type SearchProps = {
    onSearch: (value: string) => void
    isMobile: boolean
    placeholder: string
}

const Search = (props: SearchProps) => {
    const { onSearch } = props;
    const [value, setValue] = useState('');
    const [showSearch, setShowSearch] = useState(!props.isMobile);
    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Here, we call the onSearch function and pass the value
            onSearch(value);
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <div className="relative w-fit text-gray-600">
            {/* Icon button for mobile */}
            <button type="button" className=" hidden sm:hidden" onClick={toggleSearch}>
                <FaSearch />
            </button>

            

            {/* Search input */}
            <input
                type="search"
                name="search"
                placeholder={props.placeholder}
                className={`bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none ${showSearch ? 'block' : 'hidden'}`}
                onChange={(event) => searchHandler(event)}
                onKeyDown={handleKeyDown}
            />
            
            {/* Icon button for desktop */}
            <button onClick={() => onSearch(value)} type="submit" className="sm:block absolute right-0 top-0 mt-3 mr-4">
            <FaSearch />
            </button>
        </div>
    );
};

export default Search;
