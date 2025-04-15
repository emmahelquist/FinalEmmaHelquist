using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _413Final.API.Data;

public class Engagement
{
    [Key]
    public int EngagementNumber { get; set; }

    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public string StopTime { get; set; }
    public int ContractPrice { get; set; }

    public int CustomerID { get; set; }
    public int AgentID { get; set; }

    // Foreign Key
    [ForeignKey("Entertainer")]
    public int EntertainerID { get; set; }

    // Navigation Property
    public Entertainer Entertainer { get; set; }
}