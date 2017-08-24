
import { NumericMatrix } from "./index";

function getUniqueArray(arr: string[]) {
    const result: any = [];
    const hash: any = {};
    if (typeof arr !== "object" || !arr.length) {
        return result;
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = 1;
        }
    }
    return result;
}

function convertArrayValuesToHashMap(arr: string[]) {
    if (!arr || typeof arr !== "object") {
        return {};
    }
    const obj: any = {};
    for (let i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = 1;
    }
    return obj;
}

function sortArrayWithSubsetAtEnd(arr: string[], subset: string[]) {
    if (!arr || typeof arr !== "object" || !subset || typeof subset !== "object") {
        return [];
    }
    const list = [];
    const hash = convertArrayValuesToHashMap(subset);
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            list.push(arr[i]);
        }
    }
    return list.sort().concat(subset.sort());
}

function areObjectsSame(obj1: any, obj2: any) {
    let a;
    let b;
    if (obj1 === obj2) {
        return true;
    }
    if (!(obj1 instanceof obj2.constructor)) {
        return false;
    }
    for (const prop in obj1) {
        if (!obj1.hasOwnProperty(prop)) {
            continue;
        }
        a = obj1[prop];
        b = obj2[prop];
        if (typeof a === "object") {
            if (typeof a !== typeof b) {
                return false;
            }
            if (!areObjectsSame(a, b)) {
                return false;
            }
        } else {
            if (a.toString() !== b.toString()) {
                return false;
            }
        }
    }
    return true;
}

const STANDARD_MAX = "standardMax";
const STANDARD_MIN = "standardMin";
const NONSTANDARD_MIN = "nonstandardMin";
const NONSTANDARD_MAX = "nonstandardMax";

export type SimpleExpressionSideType = "left" | "right";
export type SimplexSolveType = "maximize" | "minimize" | string;

// tslint:disable-next-line:interface-name
export interface SimplexDefinition {
    Type: SimplexSolveType;
    Objective: string;
    Constraints: string[];
}

export class Simplex {
    private input: SimplexInput;
    private output: SimplexOutput;
    private tableau: SimplexTableau;
    private state: any;
    constructor(private problem: SimplexDefinition) {
         this.checkForErrors(problem);
        // SimplexInput.checkForInputError(type, z, constraints);
         this.input = new SimplexInput(problem.Type, problem.Objective, problem.Constraints);
    }
    public get Definition(): SimplexDefinition {
        return this.Definition;
    }
    public solve(): SimplexOutput {
        return this.solveInternal();
    }
    // tslint:disable-next-line:member-ordering
    public static solve(problem: SimplexDefinition): SimplexOutput {
        const simplex = new Simplex(problem);
        return simplex.solve();
    }

    public checkForErrors(obj: SimplexDefinition) {
        const errMsg = Simplex.getErrors(obj);
        if (errMsg) {
            throw new Error(errMsg);
        }
    }
    // tslint:disable-next-line:member-ordering
    public static getErrors(obj: SimplexDefinition) {
        if (typeof obj !== "object") {
            return "An object must be passed to Simplex.solve()";
        }
        if (!obj.Type || !obj.Objective || !obj.Constraints) {
            return "The object must have the properties `type`, `objective` and `constraints`.";
        }
    }

    private solveInternal(): SimplexOutput {
        this.tableau = new SimplexTableau(this.input);
        this.output = this.tableau.solve().getOutput();
        return this.output;
    }

}

// tslint:disable:max-classes-per-file
export class SimplexMatrix extends NumericMatrix {
    constructor(...rows: number[][]) {
        super(0, 0, ...rows);
    }
    // tslint:disable:no-empty
    protected checkColumnIndex(col: number): void {}
    protected checkRowIndex(row: number): void {}
    protected checkIndexes(row: number, col: number): void {}
    public get ColSize(): number {
        return this.getSize()[1];
    }
    public get RowSize(): number {
        return this.getSize()[0];
    }
    // tslint:disable-next-line:member-ordering
    public getSize(): number[] {
        let columns = 0;
        const rows = this.arr.length;
        let i = rows;
        let x;
        while (i--) {
            x = this.arr[i].length;
            columns = columns < x ? x : columns;
        }
        return [ rows, columns];
    }
    // tslint:disable:member-ordering
    public static scaleRow(scale: number, row: number[]) {
        if (!Array.isArray(row)) {
            return row;
        }
        row = row.concat();
        for (let i = 0, len = row.length; i < len; i++) {
            row[i] *= scale;
        }
        return row;
    }
    public static addRows(rowA: number[], rowB: number[]) {
        return SimplexMatrix.scaleThenAddRows(1, rowA, 1, rowB);
    }
    // tslint:disable:member-ordering
    public static scaleThenAddRows(scaleA: number, rowA: number[], scaleB: number, rowB: number[]) {
        rowA = (Array.isArray(rowA)) ? rowA.concat() : [];
        rowB = (Array.isArray(rowB)) ? rowB.concat() : [];
        const len = Math.max(rowA.length, rowB.length);
        for (let i = 0; i < len; i++) {
            rowA[i] = (scaleA * (rowA[i] || 0)) + (scaleB * (rowB[i] || 0));
        }
        return rowA;
    }
    public static inverseArray(arr: number[]) {
        if (!Array.isArray(arr)) {
            return arr;
        }
        let i = arr.length;
        while (i--) {
            arr[i] = -arr[i];
        }
        return arr;
    }

    public toString() {
        let str = "";
        this.forEachRow((i, row) => {
            if (i) {
                str += ",";
            }
            str += "[" + row.toString() + "]";
        });
        str = "[" + str + "]";
        return str;
    }

    public setUniformedWidth() {
        const info = SimplexMatrix.getMaxArray(this.arr);
        for (let i = 0, len = this.arr.length; i < len; i++) {
            this.arr[i].length = info.max;
        }
        return this;
    }

    public getGreatestValueFromLastRow(isPositive?: boolean) {
        if (!this.arr || this.arr.length < 1) {
            return -1;
        }
        const row = this.arr[this.arr.length - 1];
        const obj = SimplexMatrix.getGreatestElementInRow(row, row.length - 1, !!isPositive);
        if (isPositive) {
            return -1 < obj.value ? obj.index : -1;
        } else {
            return obj.value < 0 ? obj.index : -1;
        }
    }

    public getRowIndexWithPosMinColumnRatio(colI: number, excludeLastRow?: boolean) {
        const obj = {
            rowIndex: -1,
            // tslint:disable-next-line:object-literal-sort-keys
            minValue: Infinity,
        };
        const len = this.arr.length + (excludeLastRow ? -1 : 0);
        let val;
        let row;
        if (colI < 0 || this.arr[0].length <= colI) {
            return null;
        }
        for (let i = 0; i < len; i++) {
            row = this.arr[i];
            val = row[row.length - 1] / row[colI];
            if (0 <= val && val < obj.minValue) {
                obj.rowIndex = i;
                obj.minValue = val;
            }
        }
        return obj;
    }

    public getUnitValueForColumn(colI: number) {
        let nonZeroValues = 0;
        let val = 0;

        this.forEachRow((i, row) => {
            if (row[colI] === 1) {
                // get value in the Right Hand Side(RHS)
                val = row[row.length - 1];
            }
            if (row[colI]) {
                nonZeroValues++;
            }
        });
        val = (nonZeroValues === 1) ? val : 0;
        return val;
    }

    public getLastElementOnLastRow() {
        const row = this.arr[this.arr.length - 1];
        return row[row.length - 1];
    }
    // tslint:disable-next-line:member-ordering
    public static getGreatestElementInRow(arr: number[], excludeIndex: number, findPositive?: boolean) {
        if (!arr || !Array.isArray(arr)) {
            return null;
        }
        const obj = {
            value: Infinity * (findPositive ? -1 : 1),
            // tslint:disable-next-line:object-literal-sort-keys
            index: -1,
        };
        for (let i = 0, len = arr.length; i < len; i++) {
            if (excludeIndex === i) {
                continue;
            }
            if ((findPositive && obj.value < arr[i]) || (!findPositive && arr[i] < obj.value)) {
                obj.index = i;
                obj.value = arr[i];
            }
        }
        return obj;
    }
    public addRow(arr: number | number[]) {
        arr = Array.isArray(arr) ? arr : [arr];
        this.arr.push(arr);
        return this;
    }
    public addToRow(iRow: number, els: number | number[]) {
        if (this.arr[iRow]) {
            this.arr[iRow] = (this.arr[iRow] || []).concat(els);
        } else {
            this.addRow(els);
        }
        return this;
    }
    public equals(obj: SimplexMatrix) {
        return obj && obj instanceof SimplexMatrix && this.toString() === obj.toString();
    }
    public static getMaxArray(arrays: number[][]) {
        const obj = {
            index: 0,
            max: 0,
        };
        if (!Array.isArray(arrays)) {
            return null;
        }
        if (!Array.isArray(arrays[0])) {
            obj.max = arrays.length;
            return obj;
        }
        let i = arrays.length;
        while (i--) {
            if (obj.max < arrays[i].length) {
                obj.index = i;
                obj.max = arrays[i].length;
            }
        }
        return obj;
    }
    public scaleRow(scaleA: number, rowI: number) {
        const row = this.arr[rowI] || [];
        for (let i = 0, len = row.length; i < len; i++) {
            row[i] *= scaleA;
        }
        return this;
    }
    public pivot(rowI: number, colI: number) {
        if (!this.arr[rowI]) {
            return this;
        }
        const x = this.getElement(rowI, colI);
        let val;
        let pRow;

        // force element at (rowI, colI) to 1
        this.scaleRow(1 / x, rowI);
        pRow = this.arr[rowI];

        // force element at (i, colI) to 0, this works because (rowI, colI) == 1,
        // so just multiply by the negative -1 and add to the current row.
        for (let i = 0, len = this.arr.length; i < len; i++) {
            if (i === rowI) {
                continue;
            }
            val = this.getElement(i, colI);
            this.arr[i] = SimplexMatrix.scaleThenAddRows(-val, pRow, 1, this.arr[i]);
        }
        return this;
    }
}

export class SimplexExpression {
    private terms: any = null;
    constructor(str: string) {
        this.terms = {};
        if (typeof str !== "string" || !str.length) {
            return;
        }
        SimplexExpression.checkString(str);
        str = SimplexExpression.addSpaceBetweenTerms(str);
        this.terms = SimplexExpression.convertExpressionToObject(str);
    }

    public get Terms(): any {
        return this.terms;
    }

    // tslint:disable:member-ordering
    public static encodeE(str: string) {
        str = (str || "").toString();
        str = str.replace(/(\de)([+])(\d)/gi, "$1_plus_$3");
        str = str.replace(/(\de)([\-])(\d)/gi, "$1_sub_$3");
        return str;
    }
    public static decodeE(str: string) {
        str = (str || "").toString();
        str = str.replace(/_plus_/g, "+");
        str = str.replace(/_sub_/g, "-");
        return str;
    }
    public static hasManyCompares(str: string) {
        // tslint:disable-next-line:variable-name
        const RE_compares = /[<>]=?|=/g;
        const matches = ("" + str).replace(/\s/g, "").match(RE_compares) || [];
        return 1 < matches.length;
    }
    public static addSpaceBetweenTerms(str: string) {
        str = SimplexExpression.encodeE(str);
        str = str.replace(/([\+\-])/g, " $1 ");
        str = str.replace(/\s{2,}/g, " ");
        str = str.trim();
        str = SimplexExpression.decodeE(str);
        return str;
    }
    public static hasExcludedOperations(str: string) {
        return (/[\*\/%]/).test(str);
    }
    public static hasIncompleteBinaryOperator(str: string) {
        let hasError;
        const noSpaceStr = ("" + str).replace(/\s/g, "");
        // tslint:disable-next-line:variable-name
        const RE_hasNoPlusOrMinus = /^[^\+\-]+$/;
        // tslint:disable-next-line:variable-name
        const RE_noLeftAndRightTerms = /[\+\-]{2}|[\+\-]$/;
        const hasMoreThanOneTerm = /\S+\s+\S+/.test(str);
        hasError = hasMoreThanOneTerm && RE_hasNoPlusOrMinus.test(noSpaceStr);
        hasError = hasError || RE_noLeftAndRightTerms.test(noSpaceStr);
        return hasError;
    }
    public static hasComparison(str: string) {
        return (/[><=]/).test(str);
    }
    public static getErrorMessage(str: string) {
        let errMsg;
        if (SimplexExpression.hasComparison(str)) {
            errMsg = "Comparison are not allowed within an expression.";
        }
        if (!errMsg && SimplexExpression.hasExcludedOperations(str)) {
            errMsg = "Addition and subtraction are only supported.";
        }
        if (!errMsg && SimplexExpression.hasIncompleteBinaryOperator(str)) {
            errMsg = "Exactly one math operators must be between terms.\n Good:(a+b). Bad:(a++ b+).";
        }
        if (errMsg) {
            errMsg += "\n Input: `" + str + "`";
        }
        return errMsg;
    }
    public static checkString(str: string) {
        const errMsg = SimplexExpression.getErrorMessage(str);
        if (errMsg) {
            throw new Error(errMsg);
        }
    }

    public static extractComponentsFromVariable(str: string) {
        str = "" + str;
        const re = /^[\+\-]?\d+(\.\d+)?(e[\+\-]?\d+)?/i;
        let coeff: any = "" + (str.match(re) || [""])[0];
        let term = str.replace(re, "") || "1";
        if (+str === 0) {
            coeff = 0;
        }
        if (coeff === "") {
            coeff = /^\-/.test(term) ? -1 : 1;
            term = term.replace(/^[\+\-]/, "");
        }
        return [+coeff, term];
    }
    public static splitStrByTerms(str: string) {
        // tslint:disable:variable-name
        const RE_findSignForTerm = /([\+\-])\s+/g;
        const RE_spaceOrPlus = /\s+[\+]?/;
        return ("" + str).replace(/^\s*\+/, "").replace(RE_findSignForTerm, "$1").split(RE_spaceOrPlus);
    }
    public static convertExpressionToObject(str: string) {
        let term;
        const obj: any = {};
        const matches = SimplexExpression.splitStrByTerms((str || "").trim());
        let i = matches.length;
        while (i--) {
            term = SimplexExpression.extractComponentsFromVariable(matches[i]);
            if (!term[0]) {
                term = [0, 1];
            }
            obj[term[1]] = (obj[term[1]]) ? (obj[term[1]]) + term[0] : term[0];
        }
        return obj;
    }
    public static termAtIndex(i: number, name: string, value: number) {
        let result: any = "";
        if (value) {
            if (value < 0) {
                result += value === -1 ? "-" : value;
            } else {
                if (i) {
                    result += "+";
                }
                result += value === 1 ? "" : value;
            }
            result += name;
        } else {
            result += 0 < (name as any) && i ? "+" : "";
            result += name;
        }
        return result;
    }

    public getTermNames(excludeNumbers?: boolean, excludeSlack?: boolean) {
        const obj = this.terms;
        let terms = [];
        let key;
        const RE_slack = /^slack\d*$/i;
        for (key in obj) {
            if (!obj.hasOwnProperty(key) || (excludeSlack && RE_slack.test(key))) {
                continue;
            }
            if (isNaN(key as any)) {
                terms.push(key);
            }
        }
        terms = terms.sort();
        if (!excludeNumbers && obj && obj[1]) {
            terms.push(obj[1].toString());
        }
        return terms;
    }

    public forEachTerm(fn: (prop: string, item: any, items: any) => void) {
        if (typeof fn !== "function") {
            return;
        }
        for (const prop in this.terms) {
            if (this.terms.hasOwnProperty(prop)) {
                fn(prop, this.terms[prop], this.terms);
            }
        }
    }

    public forEachConstant(fn: (prop: string, item: string, items: any) => void) {
        if (typeof fn !== "function") {
            return;
        }
        const prop = "1";
        if (this.terms[prop]) {
            fn(prop, this.terms[prop], this.terms);
        }
    }

    public forEachVariable(fn: (prop: string, item: string, items: any) => void) {
        if (typeof fn !== "function") {
            return;
        }
        for (const prop in this.terms) {
            if (this.terms.hasOwnProperty(prop) && prop !== "1") {
                fn(prop, this.terms[prop], this.terms);
            }
        }
    }

    public toString() {
        const arr = [];
        const names = this.getTermNames();
        let i;
        let name;
        let len;
        const func = SimplexExpression.termAtIndex;

        if (!names.length) {
            return "0";
        }
        for (i = 0, len = names.length; i < len; i++) {
            name = names[i];
            arr.push(func(i, name, this.terms[name]));
        }
        return arr.join(" ").replace(/\s[\+\-]/g, "$& ");
    }

    public inverse() {
        this.forEachTerm((termName, value, terms) => {
            terms[termName] = -value;
        });
        return this;
    }

    public addTerm(name: string, value: any) {
        if (typeof value !== "undefined") {
            value += this.terms[name] || 0;
            if (value) {
                this.terms[name] = value;
            } else {
                this.removeTerm(name);
            }
        } else {
            this.addExpression(name);
        }
        return this;
    }

    public setTerm(name: string, value: any) {
        if (value) {
            this.terms[name] = value;
        } else {
            this.removeTerm(name);
        }
        return this;
    }

    public addExpression(obj: string | SimplexExpression) {
        if (!(obj instanceof SimplexExpression)) {
            obj = new SimplexExpression(obj);
        }
        this.addTerms(obj.toTermValueArray());
        return this;
    }

    public toTermValueArray() {
        const arr = [];
        for (const name in this.terms) {
            if (this.terms.hasOwnProperty(name)) {
                arr.push([name, this.terms[name]]);
            }
        }
        return arr;
    }
    public addTerms(arr: any[]) {
        if (!arr || typeof arr !== "object") {
            return this;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] && typeof arr[i] === "object") {
                this.addTerm(arr[i][0], arr[i][1]);
            }
        }
        return this;
    }

    public removeTerm(name: string) {
        delete this.terms[name];
        return this;
    }

    public scale(factor: number) {
        factor = +factor;
        this.forEachTerm((name, value, terms) => {
            terms[name] = (factor * value);
        });
        return this;
    }

    public hasTerm(name: string) {
        return !!this.terms[name];
    }

    public getTermValue(name: string) {
        return this.terms[name];
    }

    public getAllCoeffients(excludeNumbers?: boolean, excludeSlack?: boolean) {
        const arr = [];
        const names = this.getTermNames(excludeNumbers, excludeSlack);
        for (let i = 0, len = names.length; i < len; i++) {
            arr.push(+ (this.terms[names[i]] || names[i]));
        }
        return arr;
    }

    public getCoefficients(termNames: string[]) {
        const arr = [];
        let i = termNames.length;
        while (i--) {
            arr[i] = this.terms[termNames[i]] || 0;
        }
        return arr;
    }

    public clon() {
        return new SimplexExpression(this.toString());
    }

}

export class SimplexConstraint {
    private comparison = "";
    private leftSide: SimplexExpression;
    private rightSide: SimplexExpression;
    private specialTerms: any = {};
    public static readonly EPSILON = 1e-6;
    constructor(str?: string) {
        const obj = SimplexConstraint.parseToObject(str);
        if (obj) {
            this.comparison = obj.comparison;
            this.leftSide = obj.lhs;
            this.rightSide = obj.rhs;
        }
        this.specialTerms = {};
    }
    public equals(obj: any) {
        return areObjectsSame(this, obj);
    }
    public get LeftSide(): SimplexExpression {
        return this.leftSide;
    }
    public get RightSide(): SimplexExpression {
        return this.rightSide;
    }
    public get Comparison(): string {
        return this.comparison;
    }
    public static hasManyCompares(str: string) {
        const RE_compares = /[<>]=?|=/g;
        const matches = ("" + str).replace(/\s/g, "").match(RE_compares) || [];
        return 1 < matches.length;
    }
    public static hasIncompleteBinaryOperator(str: string) {
        str = str.replace(/\s{2,}/g, "");
        const noSpaceStr = ("" + str).replace(/\s/g, "");
        const hasNoOperatorBetweenValues = /[^+\-><=]\s+[^+\-><=]/.test(("" + str));
        const RE_noLeftAndRightTerms = /[+\-][><=+\-]|[><=+\-]$/;
        return RE_noLeftAndRightTerms.test(noSpaceStr) || hasNoOperatorBetweenValues;
    }

    public static getErrorMessage(str: string) {
        let errMsg;
        if (SimplexConstraint.hasManyCompares(str)) {
            errMsg = "Only 1 comparision (<,>,=, >=, <=) is allow in a Constraint.";
        }
        if (!errMsg && SimplexConstraint.hasIncompleteBinaryOperator(str)) {
            errMsg = "Math operators must be in between terms. Good:(a+b=c). Bad:(a b+=c)";
        }
        return errMsg;
    }
    public static checkInput(str: string) {
        const errMsg = SimplexConstraint.getErrorMessage(str);
        if (errMsg) {
            throw new Error(errMsg);
        }
    }

    public static switchSides(sideA: any, sideB: any, forEachTermFunc: any) {
        forEachTermFunc.call(sideA, (name: string, value: any) => {
            sideB.addTerm(name, -value);
            sideA.removeTerm(name);
        });
    }

    public getTermNames(excludeNumbers?: boolean) {
        const arr = [].concat(this.leftSide.getTermNames(excludeNumbers), this.rightSide.getTermNames(excludeNumbers));
        return getUniqueArray(arr);
    }

    public static parseToObject(str: string):
        { lhs: SimplexExpression, rhs: SimplexExpression, comparison: string } {
        str = str.replace(/([><])(\s+)(=)/g, "$1$3");
        SimplexConstraint.checkInput(str);
        const RE_comparison = /[><]=?|=/;
        const arr = ("" + str).split(RE_comparison);
        const obj: any = {
            rhs: new SimplexExpression("0"),
            // tslint:disable-next-line:object-literal-sort-keys
            comparison: "=",
        };
        obj.lhs = new SimplexExpression(arr[0]);
        if (1 < arr.length) {
            obj.rhs = new SimplexExpression(arr[1]);
            obj.comparison = "" + RE_comparison.exec(str);
        }
        return obj;
    }

    public static parse(str: string) {
        const obj = SimplexConstraint.parseToObject(str);
        let e;
        if (obj) {
            e = new SimplexConstraint();
            e.comparison = obj.comparison;
            e.leftSide = obj.lhs;
            e.rightSide = obj.rhs;
        }
        return e;
    }
    public toString() {
        return [this.leftSide, this.comparison, this.rightSide].join(" ");
    }
    public getSwappedSides(doSwap?: boolean) {
        return {
            a: (!doSwap ? this.leftSide : this.rightSide),
            b: (doSwap ? this.leftSide : this.rightSide),
        };
    }
    public moveTypeToOneSide(varSide: SimpleExpressionSideType, numSide: SimpleExpressionSideType) {
        let varSides;
        let numSides;

        if (/left|right/.test(varSide)) {
            varSides = this.getSwappedSides(/left/.test(varSide));
            SimplexConstraint.switchSides(varSides.a, varSides.b, varSides.a.forEachVariable);
        }
        if (/left|right/.test(numSide)) {
            numSides = this.getSwappedSides(/left/.test(numSide));
            SimplexConstraint.switchSides(numSides.a, numSides.b, numSides.a.forEachConstant);
        }
        return this;
    }
    public inverse() {
        // @todo moves to outside to constants on the YASMIJ.Constraint.CONST
        const oppositeCompare: any = {
            "=": "=",
            ">=": "<",
            // tslint:disable-next-line:object-literal-sort-keys
            ">": "<=",
            "<=": ">",
            "<": ">=",
        };
        if (oppositeCompare[this.comparison]) {
            this.comparison = oppositeCompare[this.comparison];
            this.leftSide.inverse();
            this.rightSide.inverse();
        }
        return this;
    }
    public removeStrictInequality() {
        let eps;
        if (/^[<>]$/.test(this.comparison)) {
            eps = SimplexConstraint.EPSILON * (">" === this.comparison ? 1 : -1);
            this.rightSide.addTerm("1", eps);
            this.comparison += "=";
        }
        return this;
    }
    public normalize() {
        this.moveTypeToOneSide("left", "right");
        if (this.rightSide.getTermValue("1") < 0) {
            this.inverse();
        }
        return this.removeStrictInequality();
    }
    public addSlack(val: any) {
        this.setSpecialTerm({
            key: "slack",
            name: "slack",
            value: val,
        });
        return this;
    }
    public setSpecialTerm(obj: any) {
        if (!obj || typeof obj !== "object" || !obj.name || !obj.key) {
            return this;
        }
        this.specialTerms[obj.key] = this.specialTerms[obj.key] || {};
        const oldName = this.specialTerms[obj.key].name;
        if (oldName) {
            if (typeof obj.value === "undefined") {
                // get old value
                obj.value = this.leftSide.getTermValue(oldName);
            }
            // remove old value
            this.leftSide.removeTerm(oldName);
        }
        this.specialTerms[obj.key].name = obj.name;
        this.leftSide.setTerm(this.specialTerms[obj.key].name, +obj.value);
        return this;
    }
    public addArtificalVariable(val: any) {
        this.setSpecialTerm({
            key: "artifical",
            name: "artifical",
            value: val,
        });
        return this;
    }
    public hasSpecialTerm(name: string) {
        return !!this.specialTerms[name];
    }
    public renameSlack(name: string) {
        this.setSpecialTerm({
            key: "slack",
            name,
        });
        return this;
    }
    public renameArtificial(name: string) {
        this.setSpecialTerm({
            key: "artifical",
            name,
        });
        return this;
    }
    public convertToEquation() {
        this.normalize();
        switch (this.comparison) {
            case "<=":
                this.addSlack(1);
                break;
            case ">=":
                this.addSlack(-1);
                this.addArtificalVariable(1);
                break;
        }
        this.comparison = "=";
        return this;
    }
    public getSpecialTermNames() {
        const names = [];
        for (const prop in this.specialTerms) {
            if (this.specialTerms.hasOwnProperty(prop) && this.specialTerms[prop]) {
                names.push(this.specialTerms[prop].name);
            }
        }
        return names.length ? names : null;
    }
    public getSpecialTermValue(name: string) {
        const obj = this.specialTerms[name];
        if (!obj) {
            return null;
        }
        return this.getCoefficients([obj.name])[0];
    }
    public getArtificalName() {
        const obj = this.specialTerms.artifical;
        if (!obj) {
            return null;
        }
        return obj.name;
    }
    public scale(factor: number) {
        this.leftSide.scale(factor);
        this.rightSide.scale(factor);
        return this;
    }
    public varSwitchSide(name: string, moveTo: string) {
        if (!/left|right/.test(moveTo)) {
            return this;
        }
        name = (isNaN(name as any)) ? name : "1";
        const sideA = ("left" === moveTo) ? this.rightSide : this.leftSide;
        const sideB = ("left" !== moveTo) ? this.rightSide : this.leftSide;
        if (sideA.hasTerm(name)) {
            sideB.addTerm(name, -sideA.getTermValue(name));
            sideA.removeTerm(name);
        }
        return this;
    }
    public getCoefficients(termNames: string[]) {
        if (!termNames) {
            return null;
        }
        const arr = new Array(termNames.length);
        let val;
        let i = arr.length;
        // Note: a term should only be on one side after normilized.
        while (i--) {
            val = this.leftSide.getTermValue(termNames[i]);
            if (val === undefined) {
                val = this.rightSide.getTermValue(termNames[i]);
            }
            arr[i] = val || 0;
        }
        return arr;
    }
    public getTermValuesFromLeftSide(termNames: string[]) {
        if (!termNames) {
            return null;
        }
        const arr = new Array(termNames.length);
        let val;
        let i = arr.length;
        while (i--) {
            val = this.leftSide.getTermValue(termNames[i]);
            if (val === undefined) {
                val = -this.rightSide.getTermValue(termNames[i]);
            }
            arr[i] = val || 0;
        }
        return arr;
    }
}

export class SimplexTableau {
    private input: SimplexInput = null;
    private colNames: string[] = [];
    private matrix: SimplexMatrix = null;
    private limit = 1e4;
    private cycles = 0;
    constructor(input: SimplexInput) {
        this.input = input;
        this.input.convertToStandardForm();
        this.setMatrixFromInput();
    }

    private static getErrorMessage(input: SimplexInput) {
        if (!(input instanceof SimplexInput)) {
            return "Must pass an instance of the Input class.";
        }
    }

    private checkForError(input: SimplexInput) {
        const errMsg = SimplexTableau.getErrorMessage(input);
        if (errMsg) {
            throw new Error(errMsg);
        }
    }
    // tslint:disable:member-ordering
    private addZToMatrix(termNames: string[]): void {
        const b = new SimplexConstraint("0 = " + this.input.Z.toString());
        b.moveTypeToOneSide("left", "right");
        let row = b.LeftSide.getCoefficients(termNames);
        row = row.concat(b.RightSide.getTermValue("1") || 0);
        this.matrix.addRow(row);
    }
    public addConstraintsToMatrix(termNames: string[]) {
        const constraints = this.input.Constraints;
        for (let i = 0, len = constraints.length; i < len; i++) {
            this.matrix.addRow(constraints[i].getCoefficients(termNames));
        }
    }
    private getSortedTermNames() {
        const termNames = this.input.getTermNames(true);
        const specialNames = this.input.getAllSpecialTermNames();
        return sortArrayWithSubsetAtEnd(termNames, specialNames);
    }
    private setMatrixFromInput() {
        this.matrix = new SimplexMatrix();
        this.colNames = this.getSortedTermNames();
        this.addConstraintsToMatrix(this.colNames.concat("1"));
        this.addZToMatrix(this.colNames);
    }
    public solve(isMin?: boolean): this {
        let point = this.getPivotPoint(this.matrix, isMin);
        let limit = this.limit;
        while (point && limit--) {
            this.matrix.pivot(point.row, point.column);
            point = this.getPivotPoint(this.matrix, isMin);
            this.cycles++;
        }
        return this;
    }
    public getPivotPoint(matrix: SimplexMatrix, isMin: boolean): { column: number, row: number } {
        if (!(matrix instanceof SimplexMatrix)) {
            return null;
        }
        const point = { column: 0, row: 0 };
        point.column = matrix.getGreatestValueFromLastRow(!!isMin);
        const obj = matrix.getRowIndexWithPosMinColumnRatio(point.column, true) || {rowIndex: -1, minValue: Infinity};
        point.row = obj.rowIndex;
        if (point.column < 0 || point.row < 0) {
            return null;
        }
        return point;
    }
    public getOutput(): SimplexOutput {
        const obj: any = { z: 0 };
        const names = this.colNames.concat();
        for (let i = 0, len = names.length; i < len; i++) {
            obj[names[i]] = this.matrix.getUnitValueForColumn(i);
        }
        obj.z = this.matrix.getLastElementOnLastRow();
        return new SimplexOutput(obj);
    }
    public toString(): string {
        let result = "";
        if (this.matrix) {
            result += "[" + this.colNames.concat("Constant").toString() + "],";
            result += this.matrix.toString();
        }
        return result;
    }
}

export class SimplexInput {
    private z: SimplexExpression = null;
    private type: string = null;
    private terms: string[] = [];
    private constraints: SimplexConstraint[] = [];
    private isStandardMode = false;
    constructor(type: string, z: string, constraints: string[]) {
        this.type = type;
        this.z = new SimplexExpression(z);
        this.constraints = this.getArrOfConstraints(constraints);
        this.setTermNames();
        this.checkConstraints();
    }
    private getZTermNotInAnyOfTheConstraints() {
        let varMissing = "";
        const terms = this.z.getTermNames();
        let term;
        let i = 0;
        const iLen = terms.length;

        for (; !varMissing && i < iLen; i++) {
            term = terms[i];
            let j = 0;
            const jLen = this.constraints.length;
            for (; j < jLen; j++) {
                if (this.constraints[j].LeftSide.Terms[term]) {
                    break;
                }
            }
            if (j === jLen) {
                varMissing = term;
            }
        }
        return varMissing;
    }
    private checkConstraints() {
        const errMsg: string[] = [];
        const missingZVar = this.getZTermNotInAnyOfTheConstraints();
        if (missingZVar) {
            errMsg.push("`" + missingZVar +
                "`, from the objective function, should appear least once in a constraint.");
        }
        return errMsg;
    }
    private getArrOfConstraints(arr: any[]) {
        arr = (Array.isArray(arr)) ? arr : [arr];
        const constraints: SimplexConstraint[] = [];
        let i = arr.length;
        while (i--) {
            constraints[i] = new SimplexConstraint(arr[i]);
        }
        return constraints;
    }
    private computeType() {
        const hasLessThan = this.doAnyConstrainsHaveRelation(/<=?/);
        const hasGreaterThan = this.doAnyConstrainsHaveRelation(/>=?/);

        if (/max/.test(this.type)) {
            return hasGreaterThan ? NONSTANDARD_MAX : STANDARD_MAX;
        }
        if (/min/.test(this.type)) {
            return hasLessThan ? NONSTANDARD_MIN : STANDARD_MIN;
        }
    }
    private doAnyConstrainsHaveRelation(comparison: string | RegExp) {
        if (!comparison) {
            return false;
        }
        const comparisoned = new RegExp(comparison);
        return this.anyConstraints((i, constraint) => {
            return comparisoned.test(constraint.comparison);
        });
    }
    private doAllConstrainsHaveRelation(comparison: string | RegExp) {
        const comparisoned = new RegExp(comparison);
        return this.allConstraints((i, constraint) => {
            return comparisoned.test(constraint.comparison);
        });
    }
    private anyConstraints(fn: (index: number, item: any, items: any[]) => void) {
        for (let i = 0, len = this.constraints.length; i < len; i++) {
            if (fn(i, this.constraints[i], this.constraints)) {
                return true;
            }
        }
        return false;
    }
    private allConstraints(fn: (index: number, item: any, items: any[]) => void) {
        let result = true;
        for (let i = 0, len = this.constraints.length; i < len; i++) {
            result = result && !!fn(i, this.constraints[i], this.constraints);
        }
        return result;
    }
    private getAllArtificalNames() {
        const names: string[] = [];
        this.forEachConstraint((i, constraint) => {
            const name = constraint.getArtificalName();
            if (name) {
                names.push(name);
            }
        });
        return names;
    }
    private forEachConstraint(fn: (index: number, item: any, items: any[]) => void) {
        for (let i = 0, len = this.constraints.length; i < len; i++) {
            fn(i, this.constraints[i], this.constraints);
        }
    }
    private addNumbersToSpecialTerms() {
        const c = this.constraints;
        let slackI = 1;
        let artificalI = 1;
        for (let i = 0, len = c.length; i < len; i++) {
            if (c[i].hasSpecialTerm("slack")) {
                c[i].renameSlack("slack" + slackI);
                slackI++;
            }
            if (c[i].hasSpecialTerm("artifical")) {
                c[i].renameArtificial("artifical" + artificalI);
                artificalI++;
            }
        }
    }
    public getTermNames(onlyVariables?: boolean): string[] {
        let vars: string[] = [];
        let i = this.constraints.length;
        while (i--) {
            vars = vars.concat(this.constraints[i].getTermNames(onlyVariables));
        }
        return getUniqueArray(vars).sort();
    }
    public getAllSpecialTermNames(): string[] {
        let names: string[] = [];
        this.forEachConstraint((i, constraint) => {
            names = names.concat(
                constraint.getSpecialTermNames());
        });
        return names;
    }
    private setTermNames() {
        this.terms = this.getTermNames();
    }
    public get Constraints(): SimplexConstraint[] { return this.constraints; }
    public get Z(): SimplexExpression { return this.z; }
    public toString() {
        return [this.type + " z = " + this.z, "where " + this.constraints.join(", ")].join(", ");
    }
    public convertConstraintsToMaxForm() {
        const c = this.constraints;
        for (let i = 0, len = c.length; i < len; i++) {
            c[i] = c[i].convertToEquation();
        }
    }
    public convertToStandardForm() {
        if (this.isStandardMode) {
            return this;
        }
        this.convertConstraintsToMaxForm();
        this.addNumbersToSpecialTerms();
        this.setTermNames();
        this.isStandardMode = true;
        return this;
    }
}

export class SimplexOutput {
    private result: any;
    constructor(obj: any) {
        this.result = obj;
        this.checkForError();
    }
    public static getErrorMessage(obj: any) {
        let errMsg;
        if (typeof obj !== "object") {
            errMsg = "An object must be passed.";
        }
        return errMsg;
    }
    public checkForError() {
        const errMsg = SimplexOutput.getErrorMessage(this.result);
        if (errMsg) {
            throw new Error(errMsg);
        }
    }
    public toString() {
        return JSON.stringify({Result: this.result});
    }
    public get Result(): any{
        return this.result;
    }
}
