
export function checkCollumns(data, collumnsToCheck) {

    // get attributes/fields from data
        let array = [];
        for (let i in data) {
          let val = data[i];
          for (let j in val) {
            let sub_key = j;
            array.push(sub_key);
          }
        }
        const unique = [...new Set(array)];
    //compare with mandatory collumns        
    return collumnsToCheck.every(item => unique.includes(item))
}