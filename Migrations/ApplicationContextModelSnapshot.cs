﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dutyChart.Models;

namespace dutyChart.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("dutyChart.Models.AbsentPeriod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("End")
                        .HasColumnType("date");

                    b.Property<DateTime>("Start")
                        .HasColumnType("date");

                    b.Property<int>("WorkerId");

                    b.HasKey("Id");

                    b.HasIndex("WorkerId");

                    b.ToTable("AbsentPeriod");
                });

            modelBuilder.Entity("dutyChart.Models.DefaultSlots", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("MaxCount");

                    b.Property<int>("MinCount");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("DefaultSlots");
                });

            modelBuilder.Entity("dutyChart.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("NumberDutyHours");

                    b.Property<int>("Priority");

                    b.HasKey("Id");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("dutyChart.Models.Hour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<int>("MaxCount");

                    b.Property<int>("MinCount");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Hour");
                });

            modelBuilder.Entity("dutyChart.Models.Slot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HourId");

                    b.Property<int>("Index");

                    b.Property<int?>("WorkerId");

                    b.HasKey("Id");

                    b.HasIndex("HourId");

                    b.ToTable("Slot");
                });

            modelBuilder.Entity("dutyChart.Models.SpecialHour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HourNumber");

                    b.Property<bool>("Type");

                    b.Property<int?>("WorkerId");

                    b.HasKey("Id");

                    b.ToTable("SpecialHour");
                });

            modelBuilder.Entity("dutyChart.Models.SpecialHourInDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<int>("HourNumber");

                    b.Property<bool>("Type");

                    b.Property<int?>("WorkerId");

                    b.HasKey("Id");

                    b.ToTable("SpecialHourInDay");
                });

            modelBuilder.Entity("dutyChart.Models.WorkerInDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<bool>("IsDuty");

                    b.Property<bool>("IsDutyOnLetters");

                    b.Property<bool>("IsDutyOnWedn");

                    b.Property<int>("WorkerId");

                    b.HasKey("Id");

                    b.ToTable("WorkerInDay");
                });

            modelBuilder.Entity("Worker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color");

                    b.Property<int>("CountAbsencePeriod");

                    b.Property<int>("IdGroup");

                    b.Property<bool>("IsDuty");

                    b.Property<bool>("IsDutyOnLetters");

                    b.Property<bool>("IsDutyOnWedn");

                    b.Property<string>("Name");

                    b.Property<string>("_desirableSlotsJson")
                        .HasColumnName("DesirableSlotsJson");

                    b.Property<string>("_unwantedSlotsJson")
                        .HasColumnName("UnwantedSlotsJson");

                    b.HasKey("Id");

                    b.ToTable("Worker");
                });

            modelBuilder.Entity("dutyChart.Models.AbsentPeriod", b =>
                {
                    b.HasOne("Worker")
                        .WithMany("_absentPeriods")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("dutyChart.Models.Slot", b =>
                {
                    b.HasOne("dutyChart.Models.Hour")
                        .WithMany("_slots")
                        .HasForeignKey("HourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
