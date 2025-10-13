const daysBetween = (date: Date | undefined): number | undefined => {
    if (!date) {
        return undefined;
    }

    let result = new Date().getMilliseconds() - date.getMilliseconds();

    result = result / (1000 * 60 * 60 * 24);

    return result;
};

export { daysBetween };
