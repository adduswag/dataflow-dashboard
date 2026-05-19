package backend.controller;

import backend.model.Dataset;
import backend.repository.DatasetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/datasets")
public class DatasetController {

    private final DatasetRepository repository;

    public DatasetController(DatasetRepository repository) {
        this.repository = repository;
    }

    // GET http://localhost:8080/datasets
    @GetMapping
    public List<Dataset> getAllDatasets() {
        return repository.findAll();
    }

    // POST http://localhost:8080/datasets
    @PostMapping
    public Dataset createDataset(@RequestBody Dataset dataset) {
        return repository.save(dataset);
    }
    @DeleteMapping("/{id}")
    public void deleteDataset(@PathVariable Long id){
        repository.deleteById(id);
    }
    @PutMapping("/{id}")
    public Dataset updateDataset(@PathVariable Long id, @RequestBody Dataset updatedDataset) {
        Dataset existing = repository.findById(id).orElseThrow();

        existing.setName(updatedDataset.getName());
        existing.setRecords(updatedDataset.getRecords());

        return repository.save(existing);
    }
}
