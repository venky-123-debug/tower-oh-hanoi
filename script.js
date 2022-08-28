// declaring parameters

var color = [
  '',
  'red',
  'blue',
  'yellow',
  'green',
  'purple'
]
//declaring poles positions with number of disks
var pole = document.querySelectorAll('.pole')
var polePos = [[4, 3, 2, 1], [], []] // disks represents 4,3,2,1 as stack(LIFO)
var a = polePos[0]
var b = polePos[1]
var c = polePos[2]
var form = document.querySelector('form') //form using to select the reqired number disks
function setForm () {
  var i = 1
  while (i <= 4) { 
    form.innerHTML += `<input checked onclick="newGame(this); return false;" value="${i}" name="pole" type="radio">${i}</button>` //represents radio button
    i++ // to increase the number of disks
  }
}

//checking for new game
function newGame (e) {
  console.clear()
  a = []
  var i = Number(e.value)
  while (i > 0) {
    a.push(i) //add disk from the bottom of the pole
    i--
  }
  c = []
  b = []
  polePos = [a, [], []]
  printMap() //map() creates a new array from calling a function for every array element
  e[i].checked = true
}

// checking for new games everytime
function newGames (e) {
  console.clear()
  a = []
  var i = Number(e.value)
  while (i > 0) {
    a.push(i)
    i--
  }
  c = []
  b = []
  polePos = [a, [], []]
  printMap()
}

//cheecking the disk colors to rule ofthe game
setForm()
function setColor () {
  var disk = document.querySelectorAll('.disk')
  var i = 0
  while (i < disk.length) {
    var e = disk[i]
    var coLor = color[Number(e.style.getPropertyValue('--i'))]
    e.style.backgroundColor = coLor
    i++
  }
}

function printMap () {
  var i = 0
  while (i < polePos.length) {
    pole[i].innerHTML = ''
    var j = polePos[i].length - 1
    while (j >= 0) {
      pole[
        i
      ].innerHTML += `<div class="disk" style="--i: ${polePos[i][j]};--j: ${j};"></div>`
      j--
    }
    i++
  }
  setColor()
  setTimeout(function () {
    checkwin()
  }, 100)
}
printMap()
setColor()
function atob () {
  if (b.length == 0) {
    b.push(a[a.length - 1])
    a.pop()
    polePos = [a, b, c]
  } else if (b[b.length - 1] > a[a.length - 1]) {
    b.push(a[a.length - 1])
    a.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function atoc () {
  if (c.length == 0) {
    c.push(a[a.length - 1])
    a.pop()
    polePos = [a, b, c]
  } else if (c[c.length - 1] > a[a.length - 1]) {
    c.push(a[a.length - 1])
    a.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function btoa () {
  if (a.length == 0) {
    a.push(b[b.length - 1])
    b.pop()
    polePos = [a, b, c]
  } else if (a[a.length - 1] > b[b.length - 1]) {
    a.push(b[b.length - 1])
    b.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function btoc () {
  if (c.length == 0) {
    c.push(b[b.length - 1])
    b.pop()
    polePos = [a, b, c]
  } else if (c[c.length - 1] > b[b.length - 1]) {
    c.push(b[b.length - 1])
    b.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function ctoa () {
  if (a.length == 0) {
    a.push(c[c.length - 1])
    c.pop()
    polePos = [a, b, c]
  } else if (a[a.length - 1] > c[c.length - 1]) {
    a.push(c[c.length - 1])
    c.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function ctob () {
  if (b.length == 0) {
    b.push(c[c.length - 1])
    c.pop()
    polePos = [a, b, c]
  } else if (b[b.length - 1] > c[c.length - 1]) {
    b.push(c[c.length - 1])
    c.pop()
    polePos = [a, b, c]
  }
  printMap()
}
function move (e) {
  printMap()
  var i = Number(e.getAttribute('x')) - 1
  if (i == 0) {
    var from = 'a'
    var to = ['b', 'c']
  } else if (i == 1) {
    var from = 'b'
    var to = ['a', 'c']
  } else {
    var from = 'c'
    var to = ['a', 'b']
  }
  pole[i].innerHTML += `
    <div class="move">
    <div class="text">
        Select the column you want to move to
    </div>
        <div class="select">
            <div class="option" onclick = '${from}to${
    to[0]
  }(); return false;'>${to[0].toUpperCase()}</div>
            <div class="option" onclick = '${from}to${
    to[1]
  }(); return false;'>${to[1].toUpperCase()}</div>
        </div>
    </div>
    `
}
function checkwin () {
  if (polePos[0].length == 0 && polePos[1].length == 0) {
    alert('Win!!!')
  }
}
var obj = {
  atob: function () {
    atob()
  },
  atoc: function () {
    atoc()
  },
  btoa: function () {
    btoa()
  },
  btoc: function () {
    btoc()
  },
  ctoa: function () {
    ctoa()
  },
  ctob: function () {
    ctob()
  }
}
var time = 0
function movepole (n, a, b, c) {
  if (n == 1) {
    var str = `${a}to${c}`
    time++
    setTimeout(function () {
      obj[str]()
    }, time * 200)
  } else {
    movepole(n - 1, a, c, b)
    movepole(1, a, b, c)
    movepole(n - 1, b, a, c)
  }
}
function giai () {
  time = 0
  var i = a.length + b.length + c.length
  var e = {
    value: i
  }
  newGames(e)
  movepole(i, 'a', 'b', 'c')
}