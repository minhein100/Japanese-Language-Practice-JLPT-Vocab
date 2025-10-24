document.addEventListener('DOMContentLoaded', () => {

    // The questions are now defined as an array of HTML strings
    const quizQuestionsData = [
        '<p>1. この報告書は、関連するすべてのデータを<span class="blank" data-correct-answer="網羅"></span> している。</p>',
        '<p>2. 健康維持のためには、バランスの良い食事から栄養を<span class="blank" data-correct-answer="摂取"></span> することが重要だ。</p>',
        '<p>3. 困難な任務であっても、彼は最後まで責任を持って<span class="blank" data-correct-answer="遂行"></span> した。</p>',
        '<p>4. 相手の立場や心情を<span class="blank" data-correct-answer="顧慮"></span> することが、円滑なコミュニケーションには不可欠だ。</p>',
        '<p>5. その行為は社の定める倫理規定に目の<span class="blank" data-correct-answer="抵触"></span> する可能性がある。</p>'
    ];

    const questionsContainer = document.getElementById('questions'); // Corrected variable name for clarity
    const answers = ["憤慨", "抵触", "網羅", "遂行", "顧慮", "摂取"];
    const answerBox = document.getElementById('answerBox');

    // --- 0. Display Questions on Page ---
    quizQuestionsData.forEach(qHtml => {
        questionsContainer.innerHTML += qHtml;
    });

    // --- Get all DOM elements ---
    const blanks = document.querySelectorAll('.blank');
    const submitBtn = document.getElementById('submitBtn');
    const resultsArea = document.getElementById('results');
    // FIX 1: Get the restart button element
    const restartBtn = document.getElementById('restartBtn');

    // 1. Shuffle and Display Answers
    const shuffledAnswers = shuffleArray(answers);
    shuffledAnswers.forEach(text => {
        const draggable = document.createElement('span');
        draggable.classList.add('draggable');
        draggable.setAttribute('draggable', 'true');
        draggable.setAttribute('data-answer', text);
        draggable.textContent = text;
        draggable.addEventListener('dragstart', dragStartFromBox);
        answerBox.appendChild(draggable);
    });

    // 2. Set up Drop Targets (Blanks)
    blanks.forEach(blank => {
        blank.addEventListener('dragover', dragOver);
        blank.addEventListener('drop', drop);
        blank.addEventListener('dragleave', dragLeave);
        // Ensure initial state is correct for newly rendered blanks
        blank.setAttribute('data-is-filled', 'false');
    });

    // 3. Set up Drop Target (Answer Box) for Drag Back
    answerBox.addEventListener('dragover', dragOver);
    answerBox.addEventListener('drop', dropBackToBox);
    answerBox.addEventListener('dragleave', dragLeave);


    // --- Drag and Drop Functions (kept as-is for brevity) ---

    // Handles drag from the Answer Box
    function dragStartFromBox(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-answer'));
        e.dataTransfer.setData('source', 'box');
        setTimeout(() => {
            e.target.style.opacity = '0.5';
        }, 0);
    }

    // Handles drag from a filled Blank
    function dragStartFromBlank(e) {
        if (e.target.getAttribute('data-is-filled') === 'true') {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-current-answer'));
            e.dataTransfer.setData('source', 'blank');
            setTimeout(() => {
                e.target.textContent = '';
                e.target.style.opacity = '0.5';
            }, 0);
        } else {
            e.preventDefault();
        }
    }

    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#d1e7dd';
    }

    function dragLeave(e) {
        e.currentTarget.style.backgroundColor = 'transparent';
        if (e.target.getAttribute('source') === 'blank' && e.target.style.opacity === '0.5') {
            e.target.textContent = e.target.getAttribute('data-current-answer');
            e.target.style.opacity = '1';
        }
    }

    function drop(e) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = 'transparent';

        const answerText = e.dataTransfer.getData('text/plain');
        const source = e.dataTransfer.getData('source');
        const targetBlank = e.currentTarget;

        // 1. Handle source blank (if dragging from another blank)
        if (source === 'blank') {
            const sourceBlank = Array.from(blanks).find(b =>
                b.getAttribute('data-current-answer') === answerText && b.style.opacity === '0.5'
            );

            if (sourceBlank && sourceBlank !== targetBlank) {
                sourceBlank.setAttribute('data-is-filled', 'false');
                sourceBlank.removeAttribute('data-current-answer');
                sourceBlank.removeAttribute('draggable');
                sourceBlank.removeEventListener('dragstart', dragStartFromBlank);
                sourceBlank.style.opacity = '1';
                sourceBlank.textContent = '';
            }
        }

        // 2. Handle old answer in target blank (SWAPPING LOGIC)
        const oldAnswerText = targetBlank.getAttribute('data-current-answer');
        if (oldAnswerText && oldAnswerText !== answerText) {
            const oldDraggable = document.querySelector(`#answerBox .draggable[data-answer="${oldAnswerText}"]`);
            if (oldDraggable) {
                oldDraggable.style.display = 'inline-block';
            }
        } else if (oldAnswerText === answerText) {
             targetBlank.textContent = answerText;
             targetBlank.style.opacity = '1';
             return;
        }

        // 3. Update the blank with the new answer
        if (source === 'box') {
            const newDraggedElement = document.querySelector(`#answerBox .draggable[data-answer="${answerText}"]`);
            if (newDraggedElement) {
                newDraggedElement.style.display = 'none';
            }
        }

        targetBlank.textContent = answerText;
        targetBlank.setAttribute('data-is-filled', 'true');
        targetBlank.setAttribute('data-current-answer', answerText);
        targetBlank.setAttribute('draggable', 'true');
        targetBlank.style.opacity = '1';
        targetBlank.addEventListener('dragstart', dragStartFromBlank);
    }


    function dropBackToBox(e) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = 'transparent';

        const answerText = e.dataTransfer.getData('text/plain');
        const source = e.dataTransfer.getData('source');

        if (source === 'blank') {
            const sourceBlank = document.querySelector(`.blank[data-current-answer="${answerText}"]`);

            if (sourceBlank) {
                // 1. Clear the blank
                sourceBlank.textContent = '';
                sourceBlank.setAttribute('data-is-filled', 'false');
                sourceBlank.removeAttribute('data-current-answer');
                sourceBlank.removeAttribute('draggable');
                sourceBlank.removeEventListener('dragstart', dragStartFromBlank);
                sourceBlank.style.opacity = '1';

                // 2. Unhide the draggable item in the answer box
                const originalDraggable = document.querySelector(`#answerBox .draggable[data-answer="${answerText}"]`);
                if (originalDraggable) {
                    originalDraggable.style.display = 'inline-block';
                    originalDraggable.style.opacity = '1';
                }
            }
        }
    }


    // --- NEW: Quiz Restart/Clear Function ---
    function clearQuiz() {
        // 1. Clear all blanks and reset their attributes/styles
        blanks.forEach(blank => {
            blank.textContent = '';
            blank.removeAttribute('data-current-answer');
            blank.setAttribute('data-is-filled', 'false');
            blank.removeAttribute('draggable');
            blank.removeEventListener('dragstart', dragStartFromBlank);
            blank.style.backgroundColor = 'transparent'; // Clear submission colors
            blank.style.border = '1px solid #ccc'; // Reset border if one was set
            blank.style.opacity = '1';
            blank.classList.remove('correct', 'incorrect');
        });

        // 2. Make all draggable answers visible in the answer box
        const draggables = document.querySelectorAll('#answerBox .draggable');
        draggables.forEach(draggable => {
            draggable.style.display = 'inline-block';
            draggable.style.opacity = '1'; // Ensure opacity is reset
        });

        // 3. Clear the results area
        resultsArea.textContent = '';

        // OPTIONAL: You might want to re-shuffle the answers box here if desired,
        // but simply un-hiding them is usually enough for a "clear" function.
    }


    // --- Event Listeners ---

    // FIX 2: Attach the clearQuiz function to the restartBtn
    if (restartBtn) {
        restartBtn.addEventListener('click', clearQuiz);
    }


    submitBtn.addEventListener('click', () => {
        let allFilled = true;
        let correctCount = 0;
        const totalQuestions = blanks.length;

        // Reset previous submission colors/borders
        blanks.forEach(blank => {
            blank.style.backgroundColor = 'transparent';
            blank.style.border = '1px solid #ccc'; // Default or desired border
            blank.classList.remove('correct', 'incorrect');
        });

        blanks.forEach(blank => {
            const currentAnswer = blank.getAttribute('data-current-answer');
            if (!currentAnswer) {
                allFilled = false;
                blank.style.border = '2px solid orange';
            } else {
                blank.style.border = '2px solid #007bff';
            }
        });

        if (!allFilled) {
            alert('Please fill all the blanks before submitting the quiz!');
            resultsArea.textContent = '';
            return;
        }

        blanks.forEach(blank => {
            const currentAnswer = blank.getAttribute('data-current-answer');
            const correctAnswer = blank.getAttribute('data-correct-answer');

            if (currentAnswer === correctAnswer) {
                correctCount++;
                blank.style.backgroundColor = '#d4edda';
                blank.classList.add('correct');
            } else {
                blank.style.backgroundColor = '#f8d7da';
                blank.classList.add('incorrect');
            }
        });

        const percentage = (correctCount / totalQuestions) * 100;
        if (correctCount === totalQuestions) {
            resultsArea.innerHTML = `
            <p>Test Completed!</p>
            <p>結果：(${totalQuestions})問のうち(${correctCount})問正解！</p>
            <p>あなたのスコア: ${percentage.toFixed(0)}%</p>
            <p style="font-size:20px; color:green; font-weight:bold;">満点！素晴らしい！</p>
        `;
        } else {
            resultsArea.innerHTML = `
            <p>Test Completed!</p>
            <p>結果：(${totalQuestions})問のうち(${correctCount})問正解！</p>
            <p>あなたのスコア: ${percentage.toFixed(0)}%</p>
            <p style="font-size:20px; font-weight:bold;">満点を目指しましょう！</p>
        `;
        }

    });

    // --- Utility Function (No Change) ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
