/* ----------------------------------------------------
   FIREGUARDS CLIENT INTERACTIVE LOGIC - JS
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. MOBILE MENU TOGGLE
       =================================================== */
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenuEl = document.getElementById('nav-menu-el');

    if (mobileToggleBtn && navMenuEl) {
        mobileToggleBtn.addEventListener('click', () => {
            const isMenuOpen = navMenuEl.classList.contains('active-menu');
            if (isMenuOpen) {
                navMenuEl.classList.remove('active-menu');
                mobileToggleBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            } else {
                navMenuEl.classList.add('active-menu');
                mobileToggleBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
            }
        });
    }

    // Add style fallback for active-menu in case it is accessed
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .nav-menu.active-menu {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: #ffffff;
                border-bottom: 1px solid var(--primary-border);
                padding: 24px;
                gap: 16px;
                box-shadow: var(--shadow-medium);
            }
        }
    `;
    document.head.appendChild(style);

    /* ===================================================
       2. INTERACTIVE SIMULATOR (HERO VISUAL)
       =================================================== */
    const simQuizForm = document.getElementById('sim-quiz-form');
    const questionCard = document.getElementById('question-card');
    const feedbackCard = document.getElementById('feedback-card');
    
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const btnNextStep = document.getElementById('btn-next-step');

    // Simulator State Elements to update dynamically
    const lessonsCompletedEl = document.getElementById('sim-lessons-completed');
    const progressPercentEl = document.getElementById('progress-percent');
    const simProgressFill = document.getElementById('sim-progress-fill');
    
    // Lesson lists elements
    const lessonItems = document.querySelectorAll('.lessons-list .lesson-item');

    let currentSelectedOption = '';
    let hasSucceeded = false;

    if (simQuizForm) {
        simQuizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedRadio = simQuizForm.querySelector('input[name="escape-route"]:checked');
            if (!selectedRadio) {
                alert('Vui lòng chọn 1 phương án trước khi gửi!');
                return;
            }
            
            currentSelectedOption = selectedRadio.value;
            questionCard.classList.add('hidden');
            feedbackCard.classList.remove('hidden');

            if (currentSelectedOption === 'B') {
                // Correct Answer!
                hasSucceeded = true;
                feedbackCard.style.borderTopColor = 'var(--success)';
                feedbackIcon.textContent = '✅';
                feedbackTitle.textContent = 'Chính xác! Bạn đã xử lý rất tốt';
                feedbackTitle.style.color = 'var(--success)';
                feedbackDesc.textContent = 'Thang bộ thoát hiểm trong tòa nhà cao tầng luôn được thiết kế cô lập khói và chịu nhiệt. Thang máy có nguy cơ cao bị ngắt nguồn điện đột ngột hoặc rò khói lọc độc vào cabin, cực kỳ nguy hiểm!';
                btnNextStep.textContent = 'Xem tiếp bài học ➔';
                btnNextStep.style.backgroundColor = 'var(--success)';
            } else {
                // Incorrect Answer!
                hasSucceeded = false;
                feedbackCard.style.borderTopColor = 'var(--primary)';
                feedbackIcon.textContent = '❌';
                feedbackTitle.textContent = 'Sai mất rồi. Kỹ năng chưa đúng!';
                feedbackTitle.style.color = 'var(--primary)';
                feedbackDesc.textContent = 'Tuyệt đối KHÔNG sử dụng thang máy trong lúc hỏa hoạn. Buồng cabin thang máy dễ bị tụ khói độc và có thể mất điện đột ngột khiến bạn bị kẹt cứng hoàn toàn không thể cứu thoát.';
                btnNextStep.textContent = 'Thử lại tình huống';
                btnNextStep.style.backgroundColor = 'var(--primary)';
            }
        });
    }

    if (btnNextStep) {
        btnNextStep.addEventListener('click', () => {
            if (hasSucceeded) {
                // Return to normal or simulate completion updates
                feedbackCard.classList.add('hidden');
                
                // Active video screen updates graphic
                const videoScreen = document.getElementById('video-screen');
                videoScreen.style.background = 'linear-gradient(135deg, #182848 0%, #4b6cb7 100%)';
                videoScreen.innerHTML = `
                    <div style="text-align: center; color: white; padding: 20px;">
                        <span style="font-size: 3rem;">🎉</span>
                        <h4 style="margin-top: 10px; font-weight: 750;">Đã xem xong Bài 8</h4>
                        <p style="font-size: 0.8rem; opacity: 0.9; margin-top: 5px;">Hệ thống tự động lưu ghi chú.</p>
                        <button id="sim-btn-replay" style="margin-top: 15px; background: white; color: var(--primary); font-weight:700; border:none; padding: 6px 14px; border-radius:4px; cursor:pointer;">
                            Học lại tình huống
                        </button>
                    </div>
                `;
                
                // Update Simulator State for dynamic experience:
                if (lessonsCompletedEl) {
                    lessonsCompletedEl.textContent = '9/12 bài học';
                }
                
                if (progressPercentEl && simProgressFill) {
                    progressPercentEl.textContent = '75%';
                    simProgressFill.style.width = '75%';
                }

                // Unlock lesson 9 automatically in lesson list
                if (lessonItems.length >= 3) {
                    // Turn active on lesson 2 (Lesson 9)
                    lessonItems[0].classList.remove('active');
                    lessonItems[0].querySelector('.lesson-name').classList.remove('text-red');
                    lessonItems[0].querySelector('.lesson-name').textContent = 'Bài 8: Kỹ thuật thoát hiểm...';
                    
                    lessonItems[1].classList.add('active');
                    lessonItems[1].querySelector('.lesson-name').classList.add('text-red');
                    lessonItems[1].querySelector('.lesson-name').innerHTML = 'Đang xem: Bài 9: Hệ thống báo cháy tự động';
                    
                    // Unlock the locked dashboard items
                    lessonItems[2].classList.remove('locked');
                    lessonItems[2].querySelector('.lock-indicator').textContent = '▶';
                    lessonItems[2].querySelector('.lesson-meta').textContent = 'Sẵn sàng học';
                }

                // Replay handler
                document.getElementById('sim-btn-replay').addEventListener('click', () => {
                    location.reload();
                });

            } else {
                // Retry state, show question again
                feedbackCard.classList.add('hidden');
                questionCard.classList.remove('hidden');
                // Uncheck radios
                const checkedRadio = simQuizForm.querySelector('input[name="escape-route"]:checked');
                if (checkedRadio) checkedRadio.checked = false;
            }
        });
    }

    /* ===================================================
       3. USER COMMENTS LOGIC (SIMULATOR COMMENTS)
       =================================================== */
    const simCommInput = document.getElementById('sim-comm-input');
    const simCommSubmit = document.getElementById('sim-comm-submit');
    const simCommentsList = document.getElementById('sim-comments-list');

    if (simCommSubmit && simCommInput && simCommentsList) {
        const postComment = () => {
            const text = simCommInput.value.trim();
            if (!text) {
                alert('Vui lòng nhập bình luận trước!');
                return;
            }

            // Create new comment item mimicking MERN UI structure
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.style.animation = 'pulse-sim-in 0.3s ease-out';
            commentItem.innerHTML = `
                <div class="avatar" style="background-color: var(--primary); display: flex; justify-content: center; align-items: center; color: white; font-weight: 700; font-size: 0.75rem;">U</div>
                <div class="comment-body">
                    <h5 class="comment-user">Bạn (Học viên) <span class="time-stamp">Vừa xong</span></h5>
                    <p class="comment-text">${text}</p>
                    <div class="comment-actions"><span>👍 0</span> <span>Phản hồi</span></div>
                </div>
            `;
            
            // Insert at the top of the comment stream
            simCommentsList.insertBefore(commentItem, simCommentsList.firstChild);
            simCommInput.value = '';
        };

        simCommSubmit.addEventListener('click', postComment);
        simCommInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                postComment();
            }
        });
    }

    /* ===================================================
       4. FAQ ACCORDION TRANSITIONS
       =================================================== */
    const faqRows = document.querySelectorAll('.faq-row');
    
    faqRows.forEach(row => {
        const questionBtn = row.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = row.classList.contains('active');
                
                // Close other accordions
                faqRows.forEach(r => r.classList.remove('active'));
                
                if (!isActive) {
                    row.classList.add('active');
                }
            });
        }
    });

    /* ===================================================
       5. TRUST STATISTICS COUNTER ANIMATION
       =================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        statNumbers.forEach(elem => {
            const target = parseInt(elem.getAttribute('data-target'), 10);
            if (!target) return; // skip 100% which is static
            
            let count = 0;
            const duration = 1500; // ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                count += Math.ceil(target / 100);
                if (count >= target) {
                    elem.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    elem.textContent = count + '+';
                }
            }, stepTime);
        });
    };

    // Trigger counters when trust section enters viewport
    const trustSection = document.querySelector('.trust-indicators-section');
    if (trustSection) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateCounters();
                    animated = true;
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(trustSection);
    }
});
