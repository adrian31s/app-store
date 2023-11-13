package app.product.types.dram_memory.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DRAMMemoryDTO {
    private String latencyCycle;
    private String memoryType;
    private String frequency;
    private int memory;

}
