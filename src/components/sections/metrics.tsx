"use client";

import { motion } from "framer-motion";
import { metrics } from "@/lib/data";
import { AnimatedCounter } from "@/components/shared/animated-counter";

export function Metrics() {
  return (
    <section aria-label="Key metrics" className="relative -mt-6 py-8 sm:-mt-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card/50 p-3 backdrop-blur-xl sm:gap-4 sm:p-5 lg:grid-cols-3">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative flex items-start gap-4 rounded-2xl p-5 transition-colors duration-300 hover:bg-muted/50 sm:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-3xl font-bold leading-none tracking-tight sm:text-[2.5rem]">
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
                {/* Bottom accent line on hover */}
                <span className="pointer-events-none absolute inset-x-5 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
