import React, { useEffect, useState } from 'react';

export const ReportsModalBody = (props) => {
  const [data, setData] = useState();
  const [total, setTotal] = useState < Float > (0)

  function groupAndSum(arr, groupKeys, sumKeys) {
    return Object.values(
      arr.reduce((acc, curr) => {
        const group = groupKeys.map(k => curr[k]).join('-');
        acc[group] = acc[group] || Object.fromEntries(
          groupKeys.map(k => [k, curr[k]]).concat(sumKeys.map(k => [k, 0])));
        console.log('test1', acc[group]['comment2'])
        // acc[group]['comment2'] = null
        sumKeys.forEach(k => acc[group][k] += curr[k]);
        // acc[group]['comment'] += '#T2 ' + curr['duration'] + ': ' + curr['no_incident'] + ', '
        acc[group]['comment1'] = '#' + curr['NORM'] + '(' + curr['duration'] + '): ';
        console.log('test', acc[group]['comment2'])
        // acc[group]['comment2'] = 
        curr['no_incident'] !== undefined ? acc[group]['comment2'] += curr['no_incident'] + ', ' : null

        return acc;
      }, {})
    )
  }


  // get props data and group by  user and date
  useEffect(() => {
    let grouppedData = groupAndSum(props.data, ['responsible_entity', 'task', 'NORM', 'date'], ['duration'])
    setData(grouppedData)
    // calculate total hours based on groupped data
    var total = 0;

    for (var property in grouppedData) {
      total += grouppedData[property].duration;
    }
    setTotal(total)
    // alert(total)   

  }, [])
  return (
    <>
      total hours: {total}
      <table>
        {data && data.map((item, index) => {
          return <tr key={index}>
            <td>{item.responsible_entity}</td>
            <td>{item.date}</td>
            <td>{item.task}</td>
            {/* <td>{item.NORM}</td>  */}
            <textarea
            cols="100"
            // disabled={true}
              onClick={() => navigator.clipboard.writeText(item.comment1 + '-' + item.comment2.replace("undefined", ""))}
            >
              {item.comment1 + '-' + item.comment2.replace("undefined", "")}
            </textarea>
            <textarea
            cols="5"
            // disabled={true}
              onClick={() => navigator.clipboard.writeText(item.duration.toFixed(2))}
            >
              {item.duration.toFixed(2)}
            </textarea>
            </tr>
        })}
      </table>
    </>
  )
}
