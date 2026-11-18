ALTER TABLE pedido_declaracao
    ADD COLUMN efeito_declaracao VARCHAR(150) NOT NULL DEFAULT 'Fins Académicos',
    ADD COLUMN nome_pai VARCHAR(200) NOT NULL DEFAULT 'Não informado',
    ADD COLUMN nome_mae VARCHAR(200) NOT NULL DEFAULT 'Não informado',
    ADD COLUMN data_nascimento DATE NULL,
    ADD COLUMN numero_bi VARCHAR(50) NULL,
    ADD COLUMN data_emissao_bi DATE NULL,
    ADD COLUMN ano_frequencia VARCHAR(30) NULL,
    ADD COLUMN ano_letivo VARCHAR(20) NULL;