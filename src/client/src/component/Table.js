// @flow

/**
 * Renders a table using Bootstrap classes
 */
import Signal from "signals";
import * as React from "react";

type TableRow = {id: number, cells: React.Node[]}; // Helper type
class Table extends React.Component<{header?: React.Node[]}, {rows: TableRow[]}> {
    state = {rows: []};
    onRowClick: Signal<number> = new Signal();

    setRows(rows: TableRow[]) {
        this.setState({rows: rows});
    }

    render() {
        return (
            <table className="table table-hover">
                {this.props.header ? (
                    <thead>
                    <tr>{this.props.header.map((title, i) => <th key={i}>{title}</th>)}</tr>
                    </thead>
                ) : null}
                <tbody>
                {this.state.rows.map(row => (
                    <tr
                        key={row.id}
                        onClick={() => {
                            if (this.onRowClick) this.onRowClick.dispatch(row.id);
                        }}
                    >
                        {row.cells.map((cell, i) => <td key={i}>{cell}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default Table;