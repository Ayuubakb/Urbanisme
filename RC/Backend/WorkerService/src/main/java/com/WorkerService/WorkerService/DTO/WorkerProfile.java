package com.WorkerService.WorkerService.DTO;

public class WorkerProfile {
    private String nom;
    private String prenom;
    private String matriculation;

    // Add the constructor
    public WorkerProfile(String nom, String prenom, String matriculation) {
        this.nom = nom;
        this.prenom = prenom;
        this.matriculation = matriculation;
    }

    // Getters and setters (if needed)
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMatriculation() {
        return matriculation;
    }

    public void setMatriculation(String matriculation) {
        this.matriculation = matriculation;
    }
}
