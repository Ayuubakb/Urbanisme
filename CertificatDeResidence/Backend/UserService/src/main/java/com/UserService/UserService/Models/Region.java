package com.UserService.UserService.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "region")
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_region;
    private String nom_region;
    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private Set<Ville> villes;
}
