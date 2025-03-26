package com.exemploMinhaEmpresa.demo.models;

import lombok.Data;
import java.util.List;

@Data
public class ProductionData {
    // Seção de Acidentes
    private List<Accident> accidents;

    // Seção de Problemas de Qualidade
    private List<QualityIssue> qualityIssues;

    // Seção de Produção
    private int quantityProduced; // Quantidade produzida
    private int lineStops; // Quantidade de paradas da linha
    private List<String> operators; // Nomes dos operadores (ex: ["João", "Maria"])
    private int operatorCount; // Número total de operadores

    // Classe interna para Acidentes
    @Data
    public static class Accident {
        private String severity; // "leve", "moderado", "grave"
        private String time; // Hora do acidente (ex: "14:30")
        private String cause; // Causa do acidente
        private String status; // "pendente", "resolvido"
    }

    // Classe interna para Problemas de Qualidade
    @Data
    public static class QualityIssue {
        private String time; // Hora do problema
        private String description; // Descrição do problema
        private String status; // "pendente", "resolvido"
    }
}
