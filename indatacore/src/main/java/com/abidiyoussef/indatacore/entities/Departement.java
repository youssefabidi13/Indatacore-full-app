package com.abidiyoussef.indatacore.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="departement")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Departement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;
    @Column(name="code")
    private String code;
    @JsonManagedReference
    @OneToMany(cascade=CascadeType.MERGE, fetch=FetchType.LAZY,mappedBy = "departement")
    private List<Student> students;


}
