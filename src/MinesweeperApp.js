import React from 'react';

export default class MinesweeperApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputArray: [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 1, 0, 0],
      ]
    }
  }

  arrayRendering(inputArray) {
    return (<table>
      <tbody>
        {
          inputArray.map(function (columnArray, parentIndex) {
            let tableRow = columnArray.map(function (value, index) {
              return (
                <td key={index}>{value}</td>
              )
            });
            return <tr key={parentIndex}>{tableRow}</tr>
          })
        }
      </tbody>
    </table>)
  }

  minesweeperLogic(inputArray) {
    let outputArray = JSON.parse(JSON.stringify(inputArray));
    for (let i = 0; i < inputArray.length; i++) {
      for (let j = 0; j < inputArray[i].length; j++) {
        if (inputArray[i][j] === 1) {
          outputArray[i][j] = 9;
        } else {
          let adjacentArray = []
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (!(dx == 0 && dy == 0)) {
                if (inputArray[i + dx] !== undefined && inputArray[i + dx][j + dy] !== undefined) {
                  adjacentArray.push(inputArray[i + dx][j + dy]);
                }
              }
            }
          }
          outputArray[i][j] = adjacentArray.filter(val => val === 1).length;
        }
      }
    }
    return outputArray;
  }
  render() {
    const { inputArray } = this.state;
    return (
      <div>
        <div>
          <h1>Input Array</h1>
          {this.arrayRendering(inputArray)}
        </div>
        <div>
          <h1>Output Array</h1>
          {this.arrayRendering(this.minesweeperLogic((inputArray)))}
        </div>
      </div>
    )
  }
}

