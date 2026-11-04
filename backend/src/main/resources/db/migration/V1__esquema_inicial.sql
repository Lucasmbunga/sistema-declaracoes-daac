-- 1. Tabela: usuario
CREATE TABLE usuario (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         nome_completo VARCHAR(150) NOT NULL,
                         email VARCHAR(100) NOT NULL UNIQUE,
                         palavra_passe VARCHAR(255) NOT NULL,
                         papel_usuario VARCHAR(30) NOT NULL,
                         criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabela: curso
CREATE TABLE curso (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       nome VARCHAR(150) NOT NULL,
                       duracao INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabela: estudante
CREATE TABLE estudante (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           id_usuario BIGINT NOT NULL UNIQUE,
                           id_curso BIGINT NOT NULL,
                           numero_mecanog VARCHAR(50) UNIQUE,
                           numero_processo VARCHAR(50) UNIQUE NOT NULL ,
                           turma VARCHAR(50),
                           numero_bi VARCHAR(20) NOT NULL UNIQUE,
                           telefone VARCHAR(20),
                           CONSTRAINT fk_estudante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
                           CONSTRAINT fk_estudante_curso FOREIGN KEY (id_curso) REFERENCES curso(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabela: pedido_declaracao
CREATE TABLE pedido_declaracao (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   codigo VARCHAR(36) NOT NULL UNIQUE,
                                   id_estudante BIGINT NOT NULL,
                                   estado ENUM('PENDENTE','AGUARDANDO_ASSINATURA','DISPONIVEL','REJEITADO','ENTREGUE') NOT NULL DEFAULT 'PENDENTE',
                                   motivo_rejeicao TEXT,
                                   criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                   CONSTRAINT fk_pedido_estudante FOREIGN KEY (id_estudante) REFERENCES estudante(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabela: historico_auditoria
CREATE TABLE historico_auditoria (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     id_pedido_declaracao BIGINT NOT NULL,
                                     id_atendente BIGINT NOT NULL,
                                     estado_anterior VARCHAR(35),
                                     estado_atual VARCHAR(35) NOT NULL,
                                     comentario TEXT,
                                     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     CONSTRAINT fk_auditoria_pedido FOREIGN KEY (id_pedido_declaracao) REFERENCES pedido_declaracao(id) ON DELETE CASCADE,
                                     CONSTRAINT fk_auditoria_atendente FOREIGN KEY (id_atendente) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tabela: anexo
CREATE TABLE anexo (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       id_pedido_declaracao BIGINT NOT NULL,
                       tipo_documento ENUM('COPIA_BI','COMPROVATIVO_PAGAMENTO','REQUERIMENTO') NOT NULL,
                       url_documento VARCHAR(255) NOT NULL,
                       nome VARCHAR(150) NOT NULL,
                       carregado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT fk_anexo_pedido FOREIGN KEY (id_pedido_declaracao) REFERENCES pedido_declaracao(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;