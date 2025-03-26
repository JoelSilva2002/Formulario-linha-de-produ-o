package com.exemploMinhaEmpresa.demo.controllers;

import com.exemploMinhaEmpresa.demo.models.ProductionData;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class ProductionController {

    @PostMapping("/submit")
    public ResponseEntity<ProductionResponse> submitForm(@RequestBody ProductionData data) {
        // Calcular produtividade
        double productivity = data.getQuantityProduced() / (double) data.getOperatorCount();

        // Criar resposta
        ProductionResponse response = new ProductionResponse(
                "Dados recebidos com sucesso!",
                productivity
        );

        return ResponseEntity.ok(response);
    }
}

class ProductionResponse {
    private String message;
    private double productivity;

    public ProductionResponse(String message, double productivity) {
        this.message = message;
        this.productivity = productivity;
    }

    // Getters e Setters (gerados automaticamente pelo Lombok)
    public String getMessage() { return message; }
    public double getProductivity() { return productivity; }
}