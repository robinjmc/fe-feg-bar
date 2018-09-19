export const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

export const chunkArray = (array, chunk) => {
        const newArray = [...array]
        let results = [];
        while (newArray.length) {
            results.push(newArray.splice(0, chunk));
        }
        return results;
    }
