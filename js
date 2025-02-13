const paragraph = "I  think Ruth's dog is cuter than your dog! dog t";

const searchTerm = 'dog';

// Expected output: "The index of the second "dog" is 38"

var count = paragraph.split(searchTerm).length - 1;
var indexOfFirst = -1;
for (let i = 0; i <= count; i++) {
    indexOfFirst = paragraph.indexOf(searchTerm, indexOfFirst + 1);
    console.log('index:' + indexOfFirst);
} 