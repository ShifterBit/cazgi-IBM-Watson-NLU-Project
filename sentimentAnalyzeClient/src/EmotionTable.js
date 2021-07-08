import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    let result = Object.entries(this.props.emotions.emotion);
    console.log(this.props.emotions);
    console.log(result);
    return (
      <div>
        <table className="table table-bordered">
          <tbody>
            {
              result.map((value) => {
                return (<tr>
                          <td>{value[0]}</td>
                          <td>{value[1]}</td>
                        </tr>)
              }
              )
            }
          </tbody>
        </table>
      </div >
    );
  }

}
export default EmotionTable;
