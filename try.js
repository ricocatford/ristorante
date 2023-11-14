var array = [
    { name: "string 1", value: "this", other: "that" },
    { name: "string 2", value: "these", other: "them" },
];

const search = (what) => array.find((element) => element.name === what);

const found = search("string 1");
if (found) {
    (found.value = "that"), console.log(found);
} else {
    array.push({ name: "added string", value: "lol", other: "kekw" });
    console.log(array);
}
