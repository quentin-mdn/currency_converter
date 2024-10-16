export const formatMoney = (amount: number | string, decimalPlaces: number = 2) => {
    // Convert the input to a float
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    // Check if the conversion resulted in a valid number
    if (isNaN(numAmount)) {
        throw new Error("Invalid amount: must be a number or a numeric string, found : " + numAmount);
    }

    // Create an instance of Intl.NumberFormat for French locale
    const formatter = new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });

    // Format the number without currency symbol
    return formatter.format(numAmount);
};

export const unformatMoney = (formattedPrice: string) => {
    // Remove spaces and replace the comma with a dot
    const cleanedString = formattedPrice
        .replace(/\s/g, '') // Remove spaces
        .replace(',', '.'); // Replace decimal comma with a dot

    // Parse the cleaned string to a float
    let numAmount = parseFloat(cleanedString);

    // Check if the conversion resulted in a valid number
    if (isNaN(numAmount)) {
        numAmount = 0
    }

    return numAmount;
};

export const timeAgo = (timestamp: Date) => {
    const now = new Date();
    const secondsPast = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (secondsPast < 60) {
        return 'just now';
    }

    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
        return minutesPast === 1 ? '1 minute ago' : `${minutesPast} minutes ago`;
    }

    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
        return hoursPast === 1 ? '1 hour ago' : `${hoursPast} hours ago`;
    }

    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 7) {
        return daysPast === 1 ? '1 day ago' : `${daysPast} days ago`;
    }

    const weeksPast = Math.floor(daysPast / 7);
    if (weeksPast < 4) {
        return weeksPast === 1 ? '1 week ago' : `${weeksPast} weeks ago`;
    }

    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
        return monthsPast === 1 ? '1 month ago' : `${monthsPast} months ago`;
    }

    const yearsPast = Math.floor(daysPast / 365);
    return yearsPast === 1 ? '1 year ago' : `${yearsPast} years ago`;
}