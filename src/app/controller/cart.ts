import '../../assets/css/cart.css';
import {Phim} from '../models/phim';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

var data = [100, 200, 300, 400, 500, 600];
Highcharts.chart('statistic', {
    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
      },
    
      subtitle: {
        text: 'Source: thesolarfoundation.com'
      },
    
      yAxis: {
        title: {
          text: 'Number of Employees'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },
    
      series: [{
        name: 'User Amount',
        data: data
      }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    
  });

let danhSachGioHang: Phim[] = [];
window.onload = () =>
{
    if(localStorage.getItem('cartList')){
        danhSachGioHang = JSON.parse(localStorage.getItem('cartList'));
    }

    taoBang();
    
}

let taoBang = () =>
{
    let content = ``;
    
    for(let i in danhSachGioHang)
    {
        let {TenPhim, NgayKhoiChieu, HinhAnh, DanhGia, MaPhim} = danhSachGioHang[i];
        content +=`
            <tr>
                <td>${parseInt(i)+1}</td>
                <td>${TenPhim}</td>
                <td><img src="${HinhAnh}" style="width:100px"/></td>
                <td>${DanhGia}</td>
                <td>${NgayKhoiChieu}</td>
                <td>
                    <button class="btn btn-info btnXoa" data-maphim="${MaPhim}">Xóa</button>
                </td>
            </tr>
        `
    }
    (<HTMLTableElement>document.getElementById('tbodyContent')).innerHTML = content;
    xoaPhim('btnXoa');
}

let xoaPhim = (btnClass:string) =>
{
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns)
    {
        btn.addEventListener('click',  () =>{
            let maphim = btn.getAttribute('data-maphim');
            let index = timPhimTheoMa(danhSachGioHang, maphim);

            if(index !== -1)
            {
                danhSachGioHang.splice(index, 1);                
            }
            localStorage.setItem('cartList', JSON.stringify(danhSachGioHang));
            taoBang();
        })
    }
}

let timPhimTheoMa = (movieArray:Phim[],maPhim: string) => {
    for (let i in movieArray) {
        if (movieArray[i].MaPhim === maPhim) {
            return parseInt(i);
        }
    }
    return -1;
}

