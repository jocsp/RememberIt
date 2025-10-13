const slugify = (input: string): string => {
    return input
        .normalize("NFD") // split accents
        .replace(/[\u0300-\u036f]/g, "") // remove diacritics
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ") // collapse spaces
        .replace(/[^a-z0-9 ]/g, "") // keep alnum + space
        .replace(/ /g, ""); // remove spaces -> "mylist"
};

export default slugify;
