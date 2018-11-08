import React from 'react';
import prog1 from '../img/bar1.svg'
import prog2 from '../img/bar2.svg'
import prog3 from '../img/bar3.svg'
import prog4 from '../img/bar4.svg'
import prog5 from '../img/bar5.svg'
import prog6 from '../img/bar6.svg'
import prog7 from '../img/bar7.svg'
import prog8 from '../img/bar8.svg'
//vaiha img/bar --> img/prog 

const ProgressBar2 = ({src}) => {
var src2 = src + 1;
var kuva = "../img/prog" + src2 + '.svg';
var kuva2 = "prog" + src2;
var imglist = [prog1, prog2, prog3, prog4, prog5, prog6, prog7, prog8];
var progress;
imglist.forEach(element => {
  if ("prog" + src2 == element){
    progress = element
    return progress;
  }
});
console.log(progress)

          return (
            <div className="bar">
            { src == 0
              ?<img src={prog1}></img>
              :null
            }
            { src == 1
              ? <img src={prog2}></img>
              :null
            }
            { src == 2
              ? <img src={prog3}></img>
              :null
            }
            { src == 3
              ? <img src={prog4}></img>
              :null
            }       
            { src == 4
              ? <img src={prog5}></img>
              :null
            }  
            { src == 5
              ? <img src={prog6}></img>
              :null
            }
            { src == 6
              ? <img src={prog7}></img>
              :null
            }
            { src == 7
              ? <img src={prog8}></img>
              :null
            }
            </div>
          );
        }
export default ProgressBar2;
