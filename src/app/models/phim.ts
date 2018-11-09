export class Phim{
    public MaPhim: string;
    public TenPhim: string;
    public Trailer: string;
    public HinhAnh: string;
    public MoTa: string;
    public MaNhom: string;
    public NgayKhoiChieu: string;
    public DanhGia: string;
    constructor(maphim: string, tenphim: string, trailer: string, hinhanh: string, mota: string, manhom: string, ngaychieu: string, danhgia: string){
        this.MaPhim = maphim;
        this.TenPhim = tenphim;
        this.HinhAnh = hinhanh;
        this.Trailer = trailer;
        this.MoTa = mota;
        this.MaNhom = manhom;
        this.NgayKhoiChieu = ngaychieu;
        this.DanhGia = danhgia;
    }
}

var phimMoi = new Phim('1','a','b','as','adsgasdg','sdgas','asojlj','dakghs');