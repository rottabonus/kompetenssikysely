import React from 'react';
import prog1 from '../img/prog1.png'
import prog2 from '../img/prog2.png'
import prog3 from '../img/prog3.png'
import prog4 from '../img/prog4.png'
import prog5 from '../img/prog5.png'
import prog6 from '../img/prog6.png'
import prog7 from '../img/prog7.png'
import prog8 from '../img/prog8.png'

const ProgressBar2 = ({src}) => {
var src2 = src + 1;
console.log(src2)
          return (
            <div className="mikabar">
              <img src={'../img/prog' + src2 + ".png"}></img>
           
           
            </div>
          );
        }
export default ProgressBar2;
