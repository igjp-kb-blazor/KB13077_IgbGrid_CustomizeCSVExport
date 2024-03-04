// helper.js

// igRegisterScript �ɂ��ẮA���L�i���b�W�x�[�X���Q�Ƃ��Ă��������B
// https://kb.jp.infragistics.com/?p=12487

igRegisterScript("formatDateInRowExporting", () => {

    // �O���b�h�̍s�G�N�X�|�[�g�C�x���g���w�ǂ���I�u�W�F�N�g�ł��B
    const formatDateCells = {
        // 1�s�G�N�X�|�[�g���邲�Ƃ� next ���\�b�h���Ăяo����܂��B
        next: (context) => {

            // ��������A�G�N�X�|�[�g����s�f�[�^���Q�Ƃł���̂ŁA
            const rowData = context.rowData;

            // ���̃T���v���ł́A�s�f�[�^���̓��t�^�̃v���p�e�B�����ׂ�
            // ���񂵁A"yyyy/MM/dd" �`���̕�����ɍ����ւ��܂��B
            Object.keys(rowData).forEach(key => {
                const cellValue = rowData[key];
                if (!cellValue instanceof Date) return;

                rowData[key] = cellValue.toLocaleString("ja-JP", {
                    year: "numeric", month: "2-digit", day: "2-digit"
                });
            });
        }
    };

    // �O���b�h���G�N�X�|�[�g���������s����Ƃ��ɌĂяo����܂�
    return (e) => {

        // �G�N�X�|�[�g����t�@�C����CSV�t�@�C���ł���ꍇ�A
        const { options, exporter } = e.detail;
        const isCSVfile = options.fileName.endsWith(".csv");
        if (!isCSVfile) return;

        // ���A�C�x���g���w�ǂ̏ꍇ�ɁA
        const observers = exporter.rowExporting.observers;
        if (observers.find(o => o === formatDateCells)) return;

        // �G�N�X�|�[�g�@�\�̍s�G�N�X�|�[�g�C�x���g�ɁA
        // ��ɒ�`�����w�ǃI�u�W�F�N�g��ǉ����܂��B
        observers.push(formatDateCells);
    };

}, true);