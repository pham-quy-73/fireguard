---
description: How to deploy FireGuard Landing Page to GitHub & live hosting on GitHub Pages
---

Đây là quy trình từng bước để tải mã nguồn Landing Page của bạn lên GitHub và kích hoạt hosting miễn phí qua **GitHub Pages**.

### Bước 1: Tạo kho lưu trữ (Repository) mới trên GitHub

1. Truy cập vào tài khoản GitHub cá nhân của bạn tại: [https://github.com](https://github.com)
2. Nhấn vào nút **"New"** (hoặc biểu tượng dấu cộng `+` ở góc trên cùng bên phải và chọn **"New repository"**).
3. Cấu hình các mục sau:
   - **Repository name:** Nhập tên kho lưu trữ, ví dụ: `fireguard-learning` hoặc `pccc-landingpage`.
   - **Public / Private:** Chọn **Public** (để sử dụng GitHub Pages miễn phí).
   - **Initialize this repository with:** *BỎ CHỌN TẤT CẢ* (Không tích vào Add a README, Add .gitignore, hoặc Choose a license vì chúng tôi đã khởi tạo Repo locally).
4. Nhấn nút **"Create repository"**.

---

### Bước 2: Liên kết và Push Code lên GitHub từ máy tính của bạn

Mở terminal tại thư mục này (`c:\C\e2\lanningpage`) và chạy các lệnh sau (Thay thế URL của bạn vào dòng số 3):

```powershell
# 1. Đổi tên nhánh mặc định thành main (khuyên dùng của GitHub)
git branch -M main

# 2. Add remote origin (Hãy thay đổi [tên_tài_khoản] và [tên_repo] bằng link GitHub Repository vừa tạo ở Bước 1)
git remote add origin https://github.com/[tên_tài_khoản]/[tên_repo].git

# 3. Push toàn bộ mã nguồn lên nhánh main
git push -u origin main
```

> [!TIP]
> Nếu bạn chưa đăng nhập Git trên máy tính, cửa sổ đăng nhập của GitHub sẽ tự động hiển thị để bạn xác thực tài khoản qua trình duyệt.

---

### Bước 3: Kích hoạt GitHub Pages để trang web chạy trực tuyến

Sau khi đã push mã nguồn lên thành công:
1. Tại giao diện Repository trên trình duyệt Web GitHub, nhấn vào tab **Settings** (Cài đặt) ở phía trên cùng của Repo.
2. Tại menu bên trái, tìm đến mục chuyên biệt: **Pages** (dưới phần *Code and automation*).
3. Dưới phần **Build and deployment**:
   - **Source:** Chọn **Deploy from a branch**.
   - **Branch:** Nhấp vào dropdown đang ghi là `None` và chọn **`main`**.
   - Thư mục bên cạnh giữ nguyên: **/ (root)**.
4. Nhấp nút **Save** (Lưu).

---

### Bước 4: Kiểm tra trang web trực tuyến (Live Website)

1. Đợi khoảng **1 - 2 phút** để công nghệ GitHub Actions hoàn thành đóng gói trang web của bạn.
2. Tải lại trang cài đặt **Pages**. Bạn sẽ nhìn thấy hộp thông báo màu xanh sáng kèm URL trực tuyến:
   > Your site is live at **`https://[tên_tài_khoản].github.io/[tên_repo]/`**
3. Bấm vào link đó và trang web của bạn đã chạy trực tuyến toàn cầu! 🚀🚒
