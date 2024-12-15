package com.UserService.UserService.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="zones")
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_zone;
    private String nom_zone;
    @ManyToOne
    @JoinColumn(name = "id_ville")
    private Ville ville;
    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    private Set<User> users;

    public Zone(int id_zone) {
        this.id_zone = id_zone;
    }
}
