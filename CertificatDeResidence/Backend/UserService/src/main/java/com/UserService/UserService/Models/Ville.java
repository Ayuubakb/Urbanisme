package com.UserService.UserService.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ville")
public class Ville {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_ville;
    private String nom_ville;
    @ManyToOne
    @JoinColumn(name = "id_region")
    private Region region;
    @OneToMany(mappedBy = "ville", cascade = CascadeType.ALL)
    private Set<Zone> zones;
}
