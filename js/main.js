document.addEventListener("DOMContentLoaded", function () {
    
    const modal = document.getElementById("productModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalOrderNowBtn = document.getElementById("modalOrderNowBtn");
    
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalRating = document.getElementById("modalRating");
    const modalOrders = document.getElementById("modalOrders");

    const mockStats = {
        "Cà Phê Phin Truyền Thống": { rating: "⭐ 4.9 (240 đánh giá)", orders: "🔥 1,250 lượt order" },
        "Espresso Thượng Hạng": { rating: "⭐ 4.8 (185 đánh giá)", orders: "🔥 840 lượt order" },
        "Cappuccino / Latte": { rating: "⭐ 4.9 (310 đánh giá)", orders: "🔥 1,560 lượt order" },
        "Trà Đào Thanh Đào": { rating: "⭐ 4.7 (142 đánh giá)", orders: "🔥 620 lượt order" },
        "Croissant Tươi Bơ Tỏi": { rating: "⭐ 4.6 (95 đánh giá)", orders: "🔥 380 lượt order" },
        "Không Gian Làm Việc": { rating: "⭐ 5.0 (520 đánh giá)", orders: "🔥 4,500 lượt ghé" }
    };

    const activityCards = document.querySelectorAll(".activity-card");

    activityCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function () {
            const title = card.querySelector("h3").innerText;
            const desc = card.querySelector("p").innerText;
            const price = card.querySelector(".price").innerText;
            const imgSrc = card.querySelector("img").src;

            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalPrice.innerText = price;
            modalImg.src = imgSrc;

            if (mockStats[title]) {
                modalRating.innerText = mockStats[title].rating;
                modalOrders.innerText = mockStats[title].orders;
            } else {
                modalRating.innerText = "⭐ 4.8 (80 đánh giá)";
                modalOrders.innerText = "🔥 200+ lượt order";
            }

            modal.style.display = "flex";
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    if (modalOrderNowBtn) {
        modalOrderNowBtn.addEventListener("click", function () {
            const currentItemName = modalTitle.innerText;
            const orderItemsInput = document.getElementById("orderItems");
            
            document.querySelector('[data-tab="order-panel"]').click();
            orderItemsInput.value = `Mua 1 phần: ${currentItemName}`;
            
            modal.style.display = "none";
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        });
    }


    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const submitBtn = document.getElementById("submitActionBtn");
    let currentActiveTab = "order-panel";

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            tabPanels.forEach(panel => panel.classList.remove("active"));
            const targetPanelId = this.getAttribute("data-tab");
            document.getElementById(targetPanelId).classList.add("active");
            
            currentActiveTab = targetPanelId;

            if (currentActiveTab === "order-panel") {
                submitBtn.innerText = "Xác Nhận Gửi Đơn Hàng";
            } else {
                submitBtn.innerText = "Xác Nhận Đặt Bàn Trước";
            }
        });
    });


    const form = document.getElementById('heritageActionForm');
    const orderHistoryBody = document.getElementById('orderHistoryBody');
    const bookingHistoryBody = document.getElementById('bookingHistoryBody');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;

            if (currentActiveTab === "order-panel") {
                const address = document.getElementById("orderAddress").value || "Tại quán";
                const items = document.getElementById("orderItems").value || "Không ghi rõ món";
                
                alert(`📦 Đặt Đơn Hàng Thành Công!`);

                const emptyRow = orderHistoryBody.querySelector('.empty-row');
                if (emptyRow) emptyRow.remove();

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${name}</strong><br><small>📞 SĐT: ${phone}</small></td>
                    <td>📍 Điểm giao: ${address}<br><span style="color:#d97706; font-weight:600;">🛒 Món: ${items}</span></td>
                    <td style="text-align:center;"><button type="button" class="btn-delete-row">Xóa</button></td>
                `;
                orderHistoryBody.appendChild(tr);

            } else {
                const date = document.getElementById("bookDate").value || "--/--/----";
                const time = document.getElementById("bookTime").value || "--:--";
                const guests = document.getElementById("bookGuests").value || "1";
                const note = document.getElementById("bookNote").value || "Không ghi chú";
                
                alert(`✨ Đặt Bàn Khách Sạn Thành Công!`);

                const emptyRow = bookingHistoryBody.querySelector('.empty-row');
                if (emptyRow) emptyRow.remove();

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${name}</strong><br><small>📞 SĐT: ${phone}</small></td>
                    <td>📅 Ngày: ${date} lúc ${time}<br>👤 Số khách: ${guests} người<br><small>📝 Yêu cầu: ${note}</small></td>
                    <td style="text-align:center;"><button type="button" class="btn-delete-row">Xóa</button></td>
                `;
                bookingHistoryBody.appendChild(tr);
            }
            
            form.reset(); 
        });
    }

    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("btn-delete-row")) {
            const rowToDelete = event.target.closest("tr");
            const tbody = rowToDelete.parentNode;
            
            if (confirm("Ní có chắc chắn muốn hủy bỏ đơn đặt dịch vụ này không?")) {
                rowToDelete.remove();
                
                if (tbody.children.length === 0) {
                    const colSpanCount = tbody.id === "orderHistoryBody" ? 3 : 3;
                    const textMessage = tbody.id === "orderHistoryBody" ? "Chưa có đơn hàng nào được đặt." : "Chưa có lịch đặt bàn nào được ghi nhận.";
                    tbody.innerHTML = `<tr class="empty-row"><td colspan="${colSpanCount}">${textMessage}</td></tr>`;
                }
            }
        }
    });

});