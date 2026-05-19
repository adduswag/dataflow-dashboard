package backend.model;

import jakarta.persistence.*;

@Entity
public class Dataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int records;

    public Dataset() {}

    public Dataset(String name, int records) {
        this.name = name;
        this.records = records;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getRecords() {
        return records;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRecords(int records) {
        this.records = records;
    }
}