CREATE TABLE declaracoes_geradas (
                                     id BIGINT NOT NULL AUTO_INCREMENT,
                                     numero_declaracao VARCHAR(100) NOT NULL UNIQUE,
                                     id_estudante BIGINT NOT NULL,
                                     nome_estudante VARCHAR(255) NOT NULL,
                                     data_geracao DATETIME NOT NULL,
                                     url_armazenamento_r2 VARCHAR(500) NOT NULL,
                                     pedido_id BIGINT NOT NULL UNIQUE,
                                     PRIMARY KEY (id),
                                     CONSTRAINT fk_declaracao_gerada_pedido
                                         FOREIGN KEY (pedido_id) REFERENCES pedido_declaracao(id),
                                     CONSTRAINT fk_id_estudante
                                         FOREIGN KEY (id_estudante) REFERENCES estudante(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;