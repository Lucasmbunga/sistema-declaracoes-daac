-- 1. Criar a tabela de lotes de impressão garantindo o motor InnoDB e compatibilidade de tipos
CREATE TABLE lotes_impressao (
                                 id BIGINT NOT NULL AUTO_INCREMENT,
                                 codigo_lote VARCHAR(50) NOT NULL UNIQUE,
                                 data_geracao DATETIME NOT NULL,
                                 atendente_id BIGINT NOT NULL,
                                 PRIMARY KEY (id),
                                 CONSTRAINT fk_lote_atendente FOREIGN KEY (atendente_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Adicionar a coluna de relacionamento na tabela de pedidos existentes
ALTER TABLE pedido_declaracao
    ADD COLUMN lote_impressao_id BIGINT NULL;

-- 3. Adicionar a restrição de chave estrangeira com segurança
ALTER TABLE pedido_declaracao
    ADD CONSTRAINT fk_pedido_lote
        FOREIGN KEY (lote_impressao_id) REFERENCES lotes_impressao(id);