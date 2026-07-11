export function compareText(
    firstValue,
    secondValue
) {

    return String(firstValue || "")
        .localeCompare(
            String(secondValue || ""),
            "es",
            {
                sensitivity: "base"
            }
        );
}

export function compareNumber(
    firstValue,
    secondValue
) {

    return Number(firstValue || 0) - Number(secondValue || 0);
}

export function compareDate(
    firstValue,
    secondValue
) {

    const firstDate =
        firstValue
            ? new Date(firstValue).getTime()
            : 0;

    const secondDate =
        secondValue
            ? new Date(secondValue).getTime()
            : 0;

    return firstDate - secondDate;
}

export function sortByOption(
    items,
    option,
    sorters
) {

    const sorter =
        sorters[option];

    if (!sorter) {
        return [...items];
    }

    return [...items]
        .map((item, index) => ({
            item,
            index
        }))
        .sort((first, second) => {

            const result =
                sorter(first.item, second.item);

            if (result !== 0) {
                return result;
            }

            return first.index - second.index;
        })
        .map(wrapper => wrapper.item);
}