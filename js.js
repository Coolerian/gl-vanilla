const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');// конетекст для рисования
let mas = []; // глобальным делаем
let count = 0;
let timer;

canvas.onclick = function(event){ //при клике создается точка
    let x = event.offsetX; // координаты относительно
    let y = event.offsetY;
    console.log(x);
    console.log(y);
    x = Math.floor(x/10); //800 /10 = 80 одна ячейка 10 пикселей
    y = Math.floor(y/10); //800 /10 = 80
    mas[y][x]=1; //заполнение игрового поля еденичкой
    console.log(mas);
    drawField(); // рисование точки
}

function goLife(){ //создание поля
    const n = 80, m = 80; //массив для имитации поля
    for (let i=0; i<m; i++){
        mas[i]=[];
        for (let j=0; j<n; j++){
            mas[i][j]=0;
        }
    }
}
goLife(); // запускаем создание игрового поля

function drawField(){
    ctx.clearRect(0, 0, 800, 800); // очищение поля
    for (let i=0; i<80; i++){
        for (let j=0; j<80; j++){
            if (mas[i][j]==1){
                ctx.fillRect(j*10, i*10, 10, 10);// рисуем квадратик
            }
        }
    }
}


function startLife(){
    //моделирование жизни
    const mas2 = [];
    for (let i=0; i<80; i++){
        mas2[i]=[];
        for (let j=0; j<80; j++){
            let neighbors = 0;
            if (mas[fpm(i)-1][j]==1) neighbors++;//up
            if (mas[i][fpp(j)+1]==1) neighbors++;//right
            if (mas[fpp(i)+1][j]==1) neighbors++;//bottom
            if (mas[i][fpm(j)-1]==1) neighbors++;//left
            if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++; //диагонали
            if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;
            if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;
            if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;
            (neighbors==3 || neighbors==2) ? mas2[i][j]=1 : mas2[i][j]==0; // если соседей 2 или 3, то
            //оживляем, иначе нет
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = String(count); //вывод количества циклов
    timer = setTimeout(startLife, 300);
}

function fpm(i){
    if(i==0) return 80;
    else return i;
}
function fpp(i){
    if(i==79) return -1;
    else return i;
}

document.getElementById('start').onclick = startLife;
