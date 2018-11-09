import '../../assets/css/index.css';
import { PhimSevice } from '../service/phimSV';
import { Phim } from '../models/phim';
import {NguoiDung} from '../models/nguoidung';
import {NguoiDungService} from '../service/nguoidungSV';


//khởi tạo instance từ lớp Phim Service
const phimSV = new PhimSevice();

let danhSachPhim: Phim[] = [];
let danhSachGioHang: Array<Phim> = [];
var nguoiDungSV = new NguoiDungService();

window.onload = function () {
    phimSV.layDanhSachPhim().done(function (res) {
        //console.log(res);
        danhSachPhim = res;
        renderMovieItem();
    }).fail(function (err) {
        console.log(err);
    })

    getUser();
}

let renderMovieItem = () => {
    let content: string = '';
    for (let movie of danhSachPhim) {
        // destructuring ES6
        let { MaPhim, TenPhim, Trailer, HinhAnh, MoTa, MaNhom, NgayKhoiChieu, DanhGia } = movie
        content += `
            <div class="col-sm-6 col-md-3 text-center">
                    <div class="movie__item">
                        <img src="${HinhAnh}" onerror="this.onerror===null; this.src='http://www.childwomenmin.gov.lk/themes/childwomenmin/assets/images/default-image.jpg'" style="height:350px" class="img-fluid w-100">
                        <div class="movie__overlay"></div>
                        <div class="movie__detail w-100 text-center text-white">
                            <i class="fa fa-play d-block mx-auto mb-3 video-play venobox " href="${Trailer}" data-vbtype="video"></i>
                            <p>
                                <a class="movie_icon btnAddToCart"><i class="fa fa-anchor"></i></a>
                                <a
                                    data-maphim = ${MaPhim}
                                    data-tenphim = ${TenPhim}
                                    data-trailer = ${Trailer}
                                    data-hinhanh = ${HinhAnh}
                                    data-mota  = ${MoTa}
                                    data-manhom = ${MaNhom}
                                    data-ngaychieu = ${NgayKhoiChieu}
                                    data-danhgia = ${DanhGia}
                                 class="movie_icon btnAddToCart"
                                ><i class="fa fa-cart-arrow-down"></i></a>
                            </p>
                            <span>Released: ${NgayKhoiChieu ? NgayKhoiChieu.substr(0, 10) : '2018-20-10'}</span>
                        </div>
                    </div>
                    <p class="movie__name text-center my-3">${TenPhim}</p>
                    ${renderStar(parseInt(DanhGia))}
             </div>
        `
    }

    (<HTMLDivElement>document.getElementById('movieList')).innerHTML = content;
    themPhimVaoGioHang('btnAddToCart');
};

let renderStar = (num: number) => {
    let stars = ``;

    if (num) {
        for (let i = 0; i < num; i++) {
            stars += `
                <i class="fa fa-star movie__star"></i>
            `
        }

        for (let k = 5; k > num; k--) {
            stars += `
                <i class="fa fa-star-o movie__star"></i>
            `
        }
    }
    else {
        for (let i = 0; i < 5; i++) {
            stars += `
                <i class="fa fa-star movie__star"></i>
            `
        }
    }

    return stars;
}

let themPhimVaoGioHang = (btnClass) => {
    let btns: any = (<HTMLCollection>document.getElementsByClassName(btnClass));
    for (let btn of btns) {
        btn.addEventListener('click', () => {

            let maPhim = btn.getAttribute('data-maphim');
            let tenPhim = btn.getAttribute('data-tenphim');
            let trailer = btn.getAttribute('data-trailer');
            let hinhAnh = btn.getAttribute('data-hinhanh');
            let moTa = btn.getAttribute('data-mota');
            let maNhom = btn.getAttribute('data-manhom');
            let ngayChieu = btn.getAttribute('data-ngaychieu');
            let danhGia = btn.getAttribute('data-danhgia');

            let PhimItem = new Phim(maPhim, tenPhim, trailer, hinhAnh, moTa, maNhom, ngayChieu, danhGia);
            //    console.log(PhimItem);
            //kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
            let index = timPhimTheoMa(PhimItem.MaPhim);

            if (index === -1) {
                // Spread operator
                danhSachGioHang = [...danhSachGioHang, PhimItem];
            }

            // console.log(danhSachGioHang);
            (localStorage.setItem('cartList', JSON.stringify(danhSachGioHang)));
            (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();
        });


    }
}

let timPhimTheoMa = (maPhim: string) => {
    for (let movie of danhSachGioHang) {
        if (movie.MaPhim === maPhim) {
            return 1;
        }
    }
    return -1;
}

// hàm đăng ký
let dangKy = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhau')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('Email')).value;
    let soDt = (<HTMLInputElement>document.getElementById('SoDT')).value;

    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'KhachHang';

    var NguoiDungMoi = new NguoiDung(taiKhoan,matKhau,email,soDt, maNhom, maLoaiNguoiDung, hoTen);
    // var ajaxThemNDM = nguoiDungSV.DangKy(NguoiDungMoi);
    //     ajaxThemNDM.done(function(kq){
    //         console.log(kq);
    //     }).fail(function(error){
    //         console.log(error);
    //     })

    nguoiDungSV.DangKy(NguoiDungMoi).done(kq => {
        if(typeof(kq) !== 'string')
        {
            alert('success');
        }
    }).fail(err => {
        console.log(err);
    })
}




let dangNhap = () =>
{
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoanDN')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhauDN')).value;

    nguoiDungSV.DangNhap(taiKhoan, matKhau).done(kq =>{
        if(typeof(kq) !== 'string')
        {
            (<HTMLButtonElement>document.getElementById('btnClose')).click();
            localStorage.setItem('Userinfo', JSON.stringify(kq));
            getUser();
        }
    }).fail(error => {
        console.log(error);
    })
}

(<HTMLButtonElement>document.getElementById('btnDangKy')).addEventListener('click',dangKy);
(<HTMLButtonElement>document.getElementById('btnDangNhap')).addEventListener('click',dangNhap);

let getUser = () =>
{
    let localUser = JSON.parse(localStorage.getItem('Userinfo'));
    if(localUser)
    {
        (<HTMLSpanElement>document.getElementById('userInfo')).style.display = 'inline';
        (<HTMLSpanElement>document.getElementById('userName')).innerHTML = localUser.TaiKhoan;
    }
}





//document.getElementById('demo').addEventListener('click', renderMovieItem);


//---------demo---------

// let taiKhoan = 'hieu'; 
// var matKhau = 'dang';
//phạm vi sử dụng của let nhỏ hơn var, let chỉ hoạt động trong 1 block
// let hay được sử dụng trong vòng for

// const a = 5;
