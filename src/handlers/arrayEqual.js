export default function arrayEqual(array1, array2, param) {
  return (
    array1.length === array2.length &&
    array1.every((item, index) => {
      const item2 = array2[index];
      return item.id === item2.id && item[param] === item2[param];
    })
  );
}
