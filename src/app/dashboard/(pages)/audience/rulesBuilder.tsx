import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash } from 'lucide-react';

interface Rule {
    field: string;
    value: number;
    operator: string;
    rules?: Rule[];
}

interface RuleBuilderProps {
    onChange: (rules: Rule[]) => void;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({ onChange }) => {
    const [rules, setRules] = useState<Rule[]>([]);

    const addRule = () => {
        setRules([...rules, { field: '', value: 0, operator: 'AND' }]);
    };

    const handleRuleChange = (index: number, updatedRule: Rule) => {
        const newRules = [...rules];
        newRules[index] = updatedRule;

        const filteredRules = newRules.map(rule => {
            if (rule.rules && rule.rules.length === 0) {
                const { rules, ...rest } = rule;
                return rest;
            }
            return rule;
        });

        setRules(filteredRules);
        onChange(filteredRules);
    };

    const deleteRule = (index: number) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
        onChange(newRules);
    };

    return (
        <div>
            <Button onClick={addRule}>Add Rule</Button>
            {rules.map((rule, index) => (
                <Rule
                    key={index}
                    rule={rule}
                    onChange={(updatedRule) => handleRuleChange(index, updatedRule)}
                    onDelete={() => deleteRule(index)}
                />
            ))}
        </div>
    );
};

interface RuleProps {
    rule: Rule;
    onChange: (rule: Rule) => void;
    onDelete: () => void;
}

const Rule: React.FC<RuleProps> = ({ rule, onChange, onDelete }) => {
    const handleFieldChange = (value: string) => {
        onChange({ ...rule, field: value });
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...rule, value: parseInt(e.target.value) });
    };

    const handleOperatorChange = (value: string) => {
        onChange({ ...rule, operator: value });
    };

    const addSubRule = () => {
        const updatedRule = { ...rule, rules: [...(rule.rules || []), { field: '', value: 0, operator: 'AND' }] };
        onChange(updatedRule);
    };

    const handleSubRuleChange = (index: number, updatedSubRule: Rule) => {
        const newSubRules = [...(rule.rules || [])];
        newSubRules[index] = updatedSubRule;
        onChange({ ...rule, rules: newSubRules });
    };

    return (
        <div className="ml-5 border-l-2 p-2 flex flex-col gap-2" style={{ marginLeft: '20px', borderLeft: '1px solid black', paddingLeft: '10px' }}>
            <div className="flex flex-row gap-2 items-center">
                <Select value={rule.field} onValueChange={handleFieldChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Field" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="totalSpends">Total Spends</SelectItem>
                        <SelectItem value="totalVisits">Total Visits</SelectItem>
                        <SelectItem value="lastVisit">Last Visit</SelectItem>
                    </SelectContent>
                </Select>
                {
                    rule.field === 'lastVisit' ?
                        <Input placeholder="How many months ago?" className="w-[200px]" type="number" value={rule.value} onChange={handleValueChange} />
                        :
                        <Input className="w-[200px]" type="number" value={rule.value} onChange={handleValueChange} />
                }
                <Select value={rule.operator} onValueChange={handleOperatorChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Operator" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={addSubRule}>Add Sub-Rule</Button>
                <button onClick={onDelete} className="text-red-500">
                    <Trash size={20} />
                </button>
            </div>
            <div>
                {rule.rules && rule.rules.map((subRule, index) => (
                    <Rule
                        key={index}
                        rule={subRule}
                        onChange={(updatedSubRule) => handleSubRuleChange(index, updatedSubRule)}
                        onDelete={() => {
                            const newSubRules = rule.rules!.filter((_, i) => i !== index);
                            onChange({ ...rule, rules: newSubRules });
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RuleBuilder;
