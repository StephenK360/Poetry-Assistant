
const fs = require('fs');

class RhymeAssistant {
    constructor() {
        this.wordList = [];
        this.loadWordList();
    }

    loadWordList() {
        // Read the wordlist.txt file and store words in the wordList array
        const data = fs.readFileSync('wordlist.txt', 'utf8');
        this.wordList = data.split('\n').map(word => word.toLowerCase());
    }

    extractRhymeComponents(word) {
        // Extract the last vowel and the remainder of the word
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        let lastVowelIndex = -1;

        for (let i = word.length - 1; i >= 0; i--) {
            if (vowels.includes(word[i])) {
                lastVowelIndex = i;
                break;
            }
        }

        if (lastVowelIndex !== -1) {
            const lastVowel = word[lastVowelIndex];
            const remainder = word.slice(lastVowelIndex + 1);
            return { lastVowel, remainder };
        } else {
            // No vowel found, return the entire word
            return { lastVowel: '', remainder: word };
        }
    }

    findRhymes(inputWord) {
        const { lastVowel, remainder } = this.extractRhymeComponents(inputWord);
        const rhymes = [];

        for (const word of this.wordList) {
            if (word !== inputWord) { // Exclude the input word itself
                const { lastVowel: wordVowel, remainder: wordRemainder } = this.extractRhymeComponents(word);
                if (lastVowel === wordVowel && remainder === wordRemainder) {
                    rhymes.push(word);
                }
            }
        }

        return rhymes;
    }
}

// Example usage
const rhymeAssistant = new RhymeAssistant();
const inputWord = 'cat';
const rhymes = rhymeAssistant.findRhymes(inputWord);

console.log(`Rhymes for ${inputWord}: ${rhymes.join(', ')}`);
